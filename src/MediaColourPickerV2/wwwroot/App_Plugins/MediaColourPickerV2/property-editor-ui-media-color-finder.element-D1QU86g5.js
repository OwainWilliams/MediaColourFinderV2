import { html as D, nothing as st, state as z, query as ht, property as ct, customElement as lt } from "@umbraco-cms/backoffice/external/lit";
import { jsonStringComparison as ut } from "@umbraco-cms/backoffice/observable-api";
import { UmbChangeEvent as Z } from "@umbraco-cms/backoffice/event";
import { UmbLitElement as pt } from "@umbraco-cms/backoffice/lit-element";
import { UMB_PROPERTY_DATASET_CONTEXT as ft } from "@umbraco-cms/backoffice/property";
var A = function(e, r) {
  return e < r ? -1 : e > r ? 1 : 0;
}, Q = function(e) {
  return e.reduce(function(r, n) {
    return r + n;
  }, 0);
}, gt = /* @__PURE__ */ (function() {
  function e(n) {
    this.colors = n;
  }
  var r = e.prototype;
  return r.palette = function() {
    return this.colors;
  }, r.map = function(n) {
    return n;
  }, e;
})(), vt = (function() {
  function e(o, t, h) {
    return (o << 10) + (t << 5) + h;
  }
  function r(o) {
    var t = [], h = !1;
    function c() {
      t.sort(o), h = !0;
    }
    return { push: function(s) {
      t.push(s), h = !1;
    }, peek: function(s) {
      return h || c(), s === void 0 && (s = t.length - 1), t[s];
    }, pop: function() {
      return h || c(), t.pop();
    }, size: function() {
      return t.length;
    }, map: function(s) {
      return t.map(s);
    }, debug: function() {
      return h || c(), t;
    } };
  }
  function n(o, t, h, c, s, a, g) {
    var l = this;
    l.r1 = o, l.r2 = t, l.g1 = h, l.g2 = c, l.b1 = s, l.b2 = a, l.histo = g;
  }
  function p() {
    this.vboxes = new r(function(o, t) {
      return A(o.vbox.count() * o.vbox.volume(), t.vbox.count() * t.vbox.volume());
    });
  }
  function u(o, t) {
    if (t.count()) {
      var h = t.r2 - t.r1 + 1, c = t.g2 - t.g1 + 1, s = Math.max.apply(null, [h, c, t.b2 - t.b1 + 1]);
      if (t.count() == 1) return [t.copy()];
      var a, g, l, v, w = 0, b = [], M = [];
      if (s == h) for (a = t.r1; a <= t.r2; a++) {
        for (v = 0, g = t.g1; g <= t.g2; g++) for (l = t.b1; l <= t.b2; l++) v += o[e(a, g, l)] || 0;
        b[a] = w += v;
      }
      else if (s == c) for (a = t.g1; a <= t.g2; a++) {
        for (v = 0, g = t.r1; g <= t.r2; g++) for (l = t.b1; l <= t.b2; l++) v += o[e(g, a, l)] || 0;
        b[a] = w += v;
      }
      else for (a = t.b1; a <= t.b2; a++) {
        for (v = 0, g = t.r1; g <= t.r2; g++) for (l = t.g1; l <= t.g2; l++) v += o[e(g, l, a)] || 0;
        b[a] = w += v;
      }
      return b.forEach(function(E, _) {
        M[_] = w - E;
      }), (function(E) {
        var _, x, m, f, d, I = E + "1", P = E + "2", S = 0;
        for (a = t[I]; a <= t[P]; a++) if (b[a] > w / 2) {
          for (m = t.copy(), f = t.copy(), d = (_ = a - t[I]) <= (x = t[P] - a) ? Math.min(t[P] - 1, ~~(a + x / 2)) : Math.max(t[I], ~~(a - 1 - _ / 2)); !b[d]; ) d++;
          for (S = M[d]; !S && b[d - 1]; ) S = M[--d];
          return m[P] = d, f[I] = m[P] + 1, [m, f];
        }
      })(s == h ? "r" : s == c ? "g" : "b");
    }
  }
  return n.prototype = { volume: function(o) {
    var t = this;
    return t._volume && !o || (t._volume = (t.r2 - t.r1 + 1) * (t.g2 - t.g1 + 1) * (t.b2 - t.b1 + 1)), t._volume;
  }, count: function(o) {
    var t = this, h = t.histo;
    if (!t._count_set || o) {
      var c, s, a, g = 0;
      for (c = t.r1; c <= t.r2; c++) for (s = t.g1; s <= t.g2; s++) for (a = t.b1; a <= t.b2; a++) g += h[e(c, s, a)] || 0;
      t._count = g, t._count_set = !0;
    }
    return t._count;
  }, copy: function() {
    var o = this;
    return new n(o.r1, o.r2, o.g1, o.g2, o.b1, o.b2, o.histo);
  }, avg: function(o) {
    var t = this, h = t.histo;
    if (!t._avg || o) {
      var c, s, a, g, l = 0, v = 0, w = 0, b = 0;
      if (t.r1 === t.r2 && t.g1 === t.g2 && t.b1 === t.b2) t._avg = [t.r1 << 3, t.g1 << 3, t.b1 << 3];
      else {
        for (s = t.r1; s <= t.r2; s++) for (a = t.g1; a <= t.g2; a++) for (g = t.b1; g <= t.b2; g++) l += c = h[e(s, a, g)] || 0, v += c * (s + 0.5) * 8, w += c * (a + 0.5) * 8, b += c * (g + 0.5) * 8;
        t._avg = l ? [~~(v / l), ~~(w / l), ~~(b / l)] : [~~(8 * (t.r1 + t.r2 + 1) / 2), ~~(8 * (t.g1 + t.g2 + 1) / 2), ~~(8 * (t.b1 + t.b2 + 1) / 2)];
      }
    }
    return t._avg;
  }, contains: function(o) {
    var t = this, h = o[0] >> 3;
    return gval = o[1] >> 3, bval = o[2] >> 3, h >= t.r1 && h <= t.r2 && gval >= t.g1 && gval <= t.g2 && bval >= t.b1 && bval <= t.b2;
  } }, p.prototype = { push: function(o) {
    this.vboxes.push({ vbox: o, color: o.avg() });
  }, palette: function() {
    return this.vboxes.map(function(o) {
      return o.color;
    });
  }, size: function() {
    return this.vboxes.size();
  }, map: function(o) {
    for (var t = this.vboxes, h = 0; h < t.size(); h++) if (t.peek(h).vbox.contains(o)) return t.peek(h).color;
    return this.nearest(o);
  }, nearest: function(o) {
    for (var t, h, c, s = this.vboxes, a = 0; a < s.size(); a++) ((h = Math.sqrt(Math.pow(o[0] - s.peek(a).color[0], 2) + Math.pow(o[1] - s.peek(a).color[1], 2) + Math.pow(o[2] - s.peek(a).color[2], 2))) < t || t === void 0) && (t = h, c = s.peek(a).color);
    return c;
  }, forcebw: function() {
    var o = this.vboxes;
    o.sort(function(s, a) {
      return A(Q(s.color), Q(a.color));
    });
    var t = o[0].color;
    t[0] < 5 && t[1] < 5 && t[2] < 5 && (o[0].color = [0, 0, 0]);
    var h = o.length - 1, c = o[h].color;
    c[0] > 251 && c[1] > 251 && c[2] > 251 && (o[h].color = [255, 255, 255]);
  } }, { quantize: function(o, t) {
    if (!Number.isInteger(t) || t < 1 || t > 256) throw new Error("Invalid maximum color count. It must be an integer between 1 and 256.");
    if (!o.length || t < 2 || t > 256 || !o.length || t < 2 || t > 256) return !1;
    for (var h = [], c = /* @__PURE__ */ new Set(), s = 0; s < o.length; s++) {
      var a = o[s], g = a.join(",");
      c.has(g) || (c.add(g), h.push(a));
    }
    if (h.length <= t) return new gt(h);
    var l = (function(_) {
      var x, m = new Array(32768);
      return _.forEach(function(f) {
        x = e(f[0] >> 3, f[1] >> 3, f[2] >> 3), m[x] = (m[x] || 0) + 1;
      }), m;
    })(o);
    l.forEach(function() {
    });
    var v = (function(_, x) {
      var m, f, d, I = 1e6, P = 0, S = 1e6, B = 0, L = 1e6, X = 0;
      return _.forEach(function(G) {
        (m = G[0] >> 3) < I ? I = m : m > P && (P = m), (f = G[1] >> 3) < S ? S = f : f > B && (B = f), (d = G[2] >> 3) < L ? L = d : d > X && (X = d);
      }), new n(I, P, S, B, L, X, x);
    })(o, l), w = new r(function(_, x) {
      return A(_.count(), x.count());
    });
    function b(_, x) {
      for (var m, f = _.size(), d = 0; d < 1e3; ) {
        if (f >= x || d++ > 1e3) return;
        if ((m = _.pop()).count()) {
          var I = u(l, m), P = I[0], S = I[1];
          if (!P) return;
          _.push(P), S && (_.push(S), f++);
        } else _.push(m), d++;
      }
    }
    w.push(v), b(w, 0.75 * t);
    for (var M = new r(function(_, x) {
      return A(_.count() * _.volume(), x.count() * x.volume());
    }); w.size(); ) M.push(w.pop());
    b(M, t);
    for (var E = new p(); M.size(); ) E.push(M.pop());
    return E;
  } };
})().quantize, tt = function(e) {
  this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = e.naturalWidth, this.height = this.canvas.height = e.naturalHeight, this.context.drawImage(e, 0, 0, this.width, this.height);
};
tt.prototype.getImageData = function() {
  return this.context.getImageData(0, 0, this.width, this.height);
};
var T = function() {
};
T.prototype.getColor = function(e, r) {
  return r === void 0 && (r = 10), this.getPalette(e, 5, r)[0];
}, T.prototype.getPalette = function(e, r, n) {
  var p = (function(h) {
    var c = h.colorCount, s = h.quality;
    if (c !== void 0 && Number.isInteger(c)) {
      if (c === 1) throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
      c = Math.max(c, 2), c = Math.min(c, 20);
    } else c = 10;
    return (s === void 0 || !Number.isInteger(s) || s < 1) && (s = 10), { colorCount: c, quality: s };
  })({ colorCount: r, quality: n }), u = new tt(e), o = (function(h, c, s) {
    for (var a, g, l, v, w, b = h, M = [], E = 0; E < c; E += s) g = b[0 + (a = 4 * E)], l = b[a + 1], v = b[a + 2], ((w = b[a + 3]) === void 0 || w >= 125) && (g > 250 && l > 250 && v > 250 || M.push([g, l, v]));
    return M;
  })(u.getImageData().data, u.width * u.height, p.quality), t = vt(o, p.colorCount);
  return t ? t.palette() : null;
}, T.prototype.getColorFromUrl = function(e, r, n) {
  var p = this, u = document.createElement("img");
  u.addEventListener("load", function() {
    var o = p.getPalette(u, 5, n);
    r(o[0], e);
  }), u.src = e;
}, T.prototype.getImageData = function(e, r) {
  var n = new XMLHttpRequest();
  n.open("GET", e, !0), n.responseType = "arraybuffer", n.onload = function() {
    if (this.status == 200) {
      var p = new Uint8Array(this.response);
      i = p.length;
      for (var u = new Array(i), o = 0; o < p.length; o++) u[o] = String.fromCharCode(p[o]);
      var t = u.join(""), h = window.btoa(t);
      r("data:image/png;base64," + h);
    }
  }, n.send();
}, T.prototype.getColorAsync = function(e, r, n) {
  var p = this;
  this.getImageData(e, function(u) {
    var o = document.createElement("img");
    o.addEventListener("load", function() {
      var t = p.getPalette(o, 5, n);
      r(t[0], this);
    }), o.src = u;
  });
};
var mt = Object.defineProperty, dt = Object.getOwnPropertyDescriptor, et = (e) => {
  throw TypeError(e);
}, R = (e, r, n, p) => {
  for (var u = p > 1 ? void 0 : p ? dt(r, n) : r, o = e.length - 1, t; o >= 0; o--)
    (t = e[o]) && (u = (p ? t(r, n, u) : t(u)) || u);
  return p && u && mt(r, n, u), u;
}, Y = (e, r, n) => r.has(e) || et("Cannot " + n), q = (e, r, n) => (Y(e, r, "read from private field"), n ? n.call(e) : r.get(e)), W = (e, r, n) => r.has(e) ? et("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, n), V = (e, r, n, p) => (Y(e, r, "write to private field"), r.set(e, n), n), C = (e, r, n) => (Y(e, r, "access private method"), n), H, k, N, O, y, U, j, ot, rt, J, nt, K, it, at, $;
let F = class extends pt {
  constructor() {
    super(...arguments), W(this, y), W(this, H, new T()), W(this, k), W(this, N), W(this, O);
  }
  set value(e) {
    V(this, N, e), V(this, O, e), e && (this._average = e.average, this._brightest = e.brightest, this._opposite = e.opposite, this._textColour = e.textColour);
  }
  get value() {
    return q(this, N);
  }
  set config(e) {
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(ft, async (e) => {
      this.observe(
        await e?.propertyValueByAlias("umbracoFile"),
        (r) => {
          const n = r?.focalPoint || { left: 0.5, top: 0.5 }, p = !q(this, k) || q(this, k).left !== n.left || q(this, k).top !== n.top;
          if (this._focalPoint = n, V(this, k, { ...n }), r?.temporaryFileId)
            C(this, y, ot).call(this);
          else {
            const u = this._imgSrc !== r?.src;
            this._imgSrc = r?.src, p && this._imgSrc && this._previewImage && !u && C(this, y, K).call(this);
          }
        }
      );
    });
  }
  render() {
    if (!this._imgSrc) return D`<p><em>Please select an image to extract the colors.</em></p>`;
    const e = this._focalPoint && (this._focalPoint.left !== 0.5 || this._focalPoint.top !== 0.5);
    return D`
			<img id="preview" hidden src=${this._imgSrc} alt="" @load=${C(this, y, it)} />
			${e ? D`
				<p style="font-size: 0.8em; color: #666; margin-bottom: 8px;">
					<uui-icon name="icon-target"></uui-icon> 
					Colors extracted from 10px radius around focal point (${Math.round(this._focalPoint.left * 100)}%, ${Math.round(this._focalPoint.top * 100)}%)
				</p>
			` : D`
				<p style="font-size: 0.8em; color: #666; margin-bottom: 8px;">
					<uui-icon name="icon-palette"></uui-icon> 
					Colors extracted from entire image
				</p>
			`}
			<uui-color-swatches readonly>
				${C(this, y, $).call(this, "Average", this._average)} ${C(this, y, $).call(this, "Brightest", this._brightest)}
				${C(this, y, $).call(this, "Opposite", this._opposite)} ${C(this, y, $).call(this, "Text color", this._textColour)}
			</uui-color-swatches>
		`;
  }
};
H = /* @__PURE__ */ new WeakMap();
k = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakMap();
O = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakSet();
U = function(e) {
  const r = (n) => {
    var p = n.toString(16);
    return p.length === 1 ? "0" + p : p;
  };
  return "#" + e.map(r).join("").toUpperCase();
};
j = function(e) {
  const r = (u) => {
    const o = (s) => s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4), [t, h, c] = u;
    return 0.2126 * o(t / 255) + 0.7152 * o(h / 255) + 0.0722 * o(c / 255);
  };
  let n = 0, p = r(e[0]);
  for (let u = 1; u < e.length; u++) {
    const o = r(e[u]);
    p < o && (p = o, n = u);
  }
  return e[n];
};
ot = function() {
  const e = this.getRootNode()?.host?.getRootNode()?.host?.getRootNode()?.host?.getRootNode()?.host?.shadowRoot?.querySelector('umb-content-workspace-property[alias="umbracoFile"]')?.shadowRoot?.firstElementChild?.shadowRoot?.firstElementChild?.shadowRoot?.firstElementChild?.querySelector("#editor > umb-property-editor-ui-image-cropper")?.shadowRoot?.firstElementChild?.shadowRoot?.querySelector("umb-image-cropper-field")?.shadowRoot?.querySelector("#main")?.querySelector("umb-image-cropper-focus-setter")?.shadowRoot?.querySelector("#image");
  e?.src && (this._imgSrc = e.src, this._imgSrc || C(this, y, at).call(this));
};
rt = function(e) {
  const [r, n, p] = e;
  return r * n * p - 1 > 16777215 / 2 ? "#000000" : "#FFFFFF";
};
J = function(e) {
  return e.map((r) => 255 - r);
};
nt = function(e, r) {
  const n = document.createElement("canvas"), p = n.getContext("2d");
  n.width = e.naturalWidth, n.height = e.naturalHeight, p.drawImage(e, 0, 0);
  const u = Math.round(r.left * e.naturalWidth), o = Math.round(r.top * e.naturalHeight), t = 10, h = Math.max(0, u - t), c = Math.max(0, o - t), s = Math.min(t * 2, e.naturalWidth - h), a = Math.min(t * 2, e.naturalHeight - c), l = p.getImageData(h, c, s, a).data, v = [];
  for (let f = 0; f < l.length; f += 4) {
    const d = l[f], I = l[f + 1], P = l[f + 2];
    l[f + 3] > 0 && v.push([d, I, P]);
  }
  const w = v.length;
  if (w === 0)
    return {
      average: [128, 128, 128],
      brightest: [255, 255, 255],
      palette: [[128, 128, 128], [255, 255, 255], [0, 0, 0]]
    };
  const b = Math.round(v.reduce((f, d) => f + d[0], 0) / w), M = Math.round(v.reduce((f, d) => f + d[1], 0) / w), E = Math.round(v.reduce((f, d) => f + d[2], 0) / w), _ = [b, M, E], x = C(this, y, j).call(this, v), m = [];
  m.push(_), m.push(x);
  for (let f = 0; f < Math.min(v.length, 10); f += Math.max(1, Math.floor(v.length / 8)))
    m.push(v[f]);
  return m.push(C(this, y, J).call(this, _)), m.push([Math.min(255, b + 40), Math.min(255, M + 40), Math.min(255, E + 40)]), m.push([Math.max(0, b - 40), Math.max(0, M - 40), Math.max(0, E - 40)]), { average: _, brightest: x, palette: m };
};
K = function() {
  if (!this._previewImage) return;
  let e, r, n;
  if (this._focalPoint) {
    const u = C(this, y, nt).call(this, this._previewImage, this._focalPoint);
    e = u.average, r = u.brightest, n = u.palette;
  } else
    e = q(this, H).getColor(this._previewImage), n = q(this, H).getPalette(this._previewImage, 20, 10), r = C(this, y, j).call(this, n);
  const p = C(this, y, J).call(this, e);
  this._average = C(this, y, U).call(this, e), this._brightest = C(this, y, U).call(this, r), this._opposite = C(this, y, U).call(this, p), this._textColour = C(this, y, rt).call(this, e), this.value = {
    average: this._average,
    brightest: this._brightest,
    opposite: this._opposite,
    textColour: this._textColour
  }, ut(this.value, q(this, O)) || this.dispatchEvent(new Z());
};
it = function() {
  this._previewImage && C(this, y, K).call(this);
};
at = function() {
  this._average = void 0, this._brightest = void 0, this._opposite = void 0, this._textColour = void 0, this.value = void 0, this.dispatchEvent(new Z());
};
$ = function(e, r) {
  return r ? D`<uui-color-swatch show-label label=${e} value=${r}></uui-color-swatch>` : st;
};
R([
  z()
], F.prototype, "_imgSrc", 2);
R([
  ht("#preview")
], F.prototype, "_previewImage", 2);
R([
  z()
], F.prototype, "_average", 2);
R([
  z()
], F.prototype, "_brightest", 2);
R([
  z()
], F.prototype, "_opposite", 2);
R([
  z()
], F.prototype, "_textColour", 2);
R([
  z()
], F.prototype, "_focalPoint", 2);
R([
  ct({ attribute: !1 })
], F.prototype, "value", 1);
F = R([
  lt("wsc-property-editor-ui-media-color-finder")
], F);
export {
  F as WscPropertyEditorUIMediaColorFinderElement,
  F as element
};
//# sourceMappingURL=property-editor-ui-media-color-finder.element-D1QU86g5.js.map
