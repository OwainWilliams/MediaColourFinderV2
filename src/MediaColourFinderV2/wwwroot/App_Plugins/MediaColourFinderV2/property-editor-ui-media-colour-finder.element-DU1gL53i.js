import { html as A, nothing as ht, state as $, query as ct, property as lt, customElement as ut } from "@umbraco-cms/backoffice/external/lit";
import { UmbChangeEvent as tt } from "@umbraco-cms/backoffice/event";
import { UmbLitElement as ft } from "@umbraco-cms/backoffice/lit-element";
import { UMB_PROPERTY_DATASET_CONTEXT as pt } from "@umbraco-cms/backoffice/property";
var H = function(e, r) {
  return e < r ? -1 : e > r ? 1 : 0;
}, Z = function(e) {
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
  function f() {
    this.vboxes = new r(function(o, t) {
      return H(o.vbox.count() * o.vbox.volume(), t.vbox.count() * t.vbox.volume());
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
        var _, x, d, p, m, S = E + "1", P = E + "2", q = 0;
        for (a = t[S]; a <= t[P]; a++) if (b[a] > w / 2) {
          for (d = t.copy(), p = t.copy(), m = (_ = a - t[S]) <= (x = t[P] - a) ? Math.min(t[P] - 1, ~~(a + x / 2)) : Math.max(t[S], ~~(a - 1 - _ / 2)); !b[m]; ) m++;
          for (q = M[m]; !q && b[m - 1]; ) q = M[--m];
          return d[P] = m, p[S] = d[P] + 1, [d, p];
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
  } }, f.prototype = { push: function(o) {
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
      return H(Z(s.color), Z(a.color));
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
      var x, d = new Array(32768);
      return _.forEach(function(p) {
        x = e(p[0] >> 3, p[1] >> 3, p[2] >> 3), d[x] = (d[x] || 0) + 1;
      }), d;
    })(o);
    l.forEach(function() {
    });
    var v = (function(_, x) {
      var d, p, m, S = 1e6, P = 0, q = 1e6, V = 0, X = 1e6, G = 0;
      return _.forEach(function(J) {
        (d = J[0] >> 3) < S ? S = d : d > P && (P = d), (p = J[1] >> 3) < q ? q = p : p > V && (V = p), (m = J[2] >> 3) < X ? X = m : m > G && (G = m);
      }), new n(S, P, q, V, X, G, x);
    })(o, l), w = new r(function(_, x) {
      return H(_.count(), x.count());
    });
    function b(_, x) {
      for (var d, p = _.size(), m = 0; m < 1e3; ) {
        if (p >= x || m++ > 1e3) return;
        if ((d = _.pop()).count()) {
          var S = u(l, d), P = S[0], q = S[1];
          if (!P) return;
          _.push(P), q && (_.push(q), p++);
        } else _.push(d), m++;
      }
    }
    w.push(v), b(w, 0.75 * t);
    for (var M = new r(function(_, x) {
      return H(_.count() * _.volume(), x.count() * x.volume());
    }); w.size(); ) M.push(w.pop());
    b(M, t);
    for (var E = new f(); M.size(); ) E.push(M.pop());
    return E;
  } };
})().quantize, et = function(e) {
  this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.width = this.canvas.width = e.naturalWidth, this.height = this.canvas.height = e.naturalHeight, this.context.drawImage(e, 0, 0, this.width, this.height);
};
et.prototype.getImageData = function() {
  return this.context.getImageData(0, 0, this.width, this.height);
};
var D = function() {
};
D.prototype.getColor = function(e, r) {
  return r === void 0 && (r = 10), this.getPalette(e, 5, r)[0];
}, D.prototype.getPalette = function(e, r, n) {
  var f = (function(h) {
    var c = h.colorCount, s = h.quality;
    if (c !== void 0 && Number.isInteger(c)) {
      if (c === 1) throw new Error("colorCount should be between 2 and 20. To get one color, call getColor() instead of getPalette()");
      c = Math.max(c, 2), c = Math.min(c, 20);
    } else c = 10;
    return (s === void 0 || !Number.isInteger(s) || s < 1) && (s = 10), { colorCount: c, quality: s };
  })({ colorCount: r, quality: n }), u = new et(e), o = (function(h, c, s) {
    for (var a, g, l, v, w, b = h, M = [], E = 0; E < c; E += s) g = b[0 + (a = 4 * E)], l = b[a + 1], v = b[a + 2], ((w = b[a + 3]) === void 0 || w >= 125) && (g > 250 && l > 250 && v > 250 || M.push([g, l, v]));
    return M;
  })(u.getImageData().data, u.width * u.height, f.quality), t = vt(o, f.colorCount);
  return t ? t.palette() : null;
}, D.prototype.getColorFromUrl = function(e, r, n) {
  var f = this, u = document.createElement("img");
  u.addEventListener("load", function() {
    var o = f.getPalette(u, 5, n);
    r(o[0], e);
  }), u.src = e;
}, D.prototype.getImageData = function(e, r) {
  var n = new XMLHttpRequest();
  n.open("GET", e, !0), n.responseType = "arraybuffer", n.onload = function() {
    if (this.status == 200) {
      var f = new Uint8Array(this.response);
      i = f.length;
      for (var u = new Array(i), o = 0; o < f.length; o++) u[o] = String.fromCharCode(f[o]);
      var t = u.join(""), h = window.btoa(t);
      r("data:image/png;base64," + h);
    }
  }, n.send();
}, D.prototype.getColorAsync = function(e, r, n) {
  var f = this;
  this.getImageData(e, function(u) {
    var o = document.createElement("img");
    o.addEventListener("load", function() {
      var t = f.getPalette(o, 5, n);
      r(t[0], this);
    }), o.src = u;
  });
};
var dt = Object.defineProperty, mt = Object.getOwnPropertyDescriptor, ot = (e) => {
  throw TypeError(e);
}, k = (e, r, n, f) => {
  for (var u = f > 1 ? void 0 : f ? mt(r, n) : r, o = e.length - 1, t; o >= 0; o--)
    (t = e[o]) && (u = (f ? t(r, n, u) : t(u)) || u);
  return f && u && dt(r, n, u), u;
}, Y = (e, r, n) => r.has(e) || ot("Cannot " + n), F = (e, r, n) => (Y(e, r, "read from private field"), n ? n.call(e) : r.get(e)), z = (e, r, n) => r.has(e) ? ot("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, n), I = (e, r, n, f) => (Y(e, r, "write to private field"), r.set(e, n), n), C = (e, r, n) => (Y(e, r, "access private method"), n), L, N, R, W, U, y, B, j, rt, nt, K, it, Q, at, st, O;
let T = class extends ft {
  constructor() {
    super(...arguments), z(this, y), z(this, L, new D()), z(this, N), z(this, R), z(this, W), z(this, U);
  }
  set value(e) {
    if (typeof e == "string") {
      I(this, W, e);
      try {
        I(this, R, JSON.parse(e));
      } catch {
        I(this, R, void 0);
      }
    } else typeof e == "object" && e !== null ? (I(this, R, e), I(this, W, JSON.stringify(e))) : (I(this, R, void 0), I(this, W, void 0));
    F(this, R) && (this._average = F(this, R).average, this._brightest = F(this, R).brightest, this._opposite = F(this, R).opposite, this._textColour = F(this, R).textColour);
  }
  get value() {
    return F(this, W);
  }
  set config(e) {
  }
  connectedCallback() {
    super.connectedCallback(), this.consumeContext(pt, async (e) => {
      this.observe(
        await e?.propertyValueByAlias("umbracoFile"),
        (r) => {
          const n = r?.focalPoint || { left: 0.5, top: 0.5 }, f = !F(this, N) || F(this, N).left !== n.left || F(this, N).top !== n.top;
          if (this._focalPoint = n, I(this, N, { ...n }), r?.temporaryFileId)
            C(this, y, rt).call(this);
          else {
            const u = this._imgSrc !== r?.src;
            this._imgSrc = r?.src, f && this._imgSrc && this._previewImage && !u && C(this, y, Q).call(this);
          }
        }
      );
    });
  }
  render() {
    if (!this._imgSrc) return A`<p><em>Please select an image to extract the colors.</em></p>`;
    const e = this._focalPoint && (this._focalPoint.left !== 0.5 || this._focalPoint.top !== 0.5);
    return A`
			<img id="preview" hidden src=${this._imgSrc} alt="" @load=${C(this, y, at)} />
			${e ? A`
				<p style="font-size: 0.8em; color: #666; margin-bottom: 8px;">
					<uui-icon name="icon-target"></uui-icon>
					Colors extracted from 10px radius around focal point (${Math.round(this._focalPoint.left * 100)}%, ${Math.round(this._focalPoint.top * 100)}%)
				</p>
			` : A`
				<p style="font-size: 0.8em; color: #666; margin-bottom: 8px;">
					<uui-icon name="icon-palette"></uui-icon>
					Colors extracted from entire image
				</p>
			`}
			<uui-color-swatches readonly>
				${C(this, y, O).call(this, "Average", this._average)} ${C(this, y, O).call(this, "Brightest", this._brightest)}
				${C(this, y, O).call(this, "Opposite", this._opposite)} ${C(this, y, O).call(this, "Text color", this._textColour)}
			</uui-color-swatches>
		`;
  }
};
L = /* @__PURE__ */ new WeakMap();
N = /* @__PURE__ */ new WeakMap();
R = /* @__PURE__ */ new WeakMap();
W = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
y = /* @__PURE__ */ new WeakSet();
B = function(e) {
  const r = (n) => {
    var f = n.toString(16);
    return f.length === 1 ? "0" + f : f;
  };
  return "#" + e.map(r).join("").toUpperCase();
};
j = function(e) {
  const r = (u) => {
    const o = (s) => s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4), [t, h, c] = u;
    return 0.2126 * o(t / 255) + 0.7152 * o(h / 255) + 0.0722 * o(c / 255);
  };
  let n = 0, f = r(e[0]);
  for (let u = 1; u < e.length; u++) {
    const o = r(e[u]);
    f < o && (f = o, n = u);
  }
  return e[n];
};
rt = function() {
  const e = this.getRootNode()?.host?.getRootNode()?.host?.getRootNode()?.host?.getRootNode()?.host?.shadowRoot?.querySelector('umb-content-workspace-property[alias="umbracoFile"]')?.shadowRoot?.firstElementChild?.shadowRoot?.firstElementChild?.shadowRoot?.firstElementChild?.querySelector("#editor > umb-property-editor-ui-image-cropper")?.shadowRoot?.firstElementChild?.shadowRoot?.querySelector("umb-image-cropper-field")?.shadowRoot?.querySelector("#main")?.querySelector("umb-image-cropper-focus-setter")?.shadowRoot?.querySelector("#image");
  e?.src && (this._imgSrc = e.src, this._imgSrc || C(this, y, st).call(this));
};
nt = function(e) {
  const [r, n, f] = e;
  return r * n * f - 1 > 16777215 / 2 ? "#000000" : "#FFFFFF";
};
K = function(e) {
  return e.map((r) => 255 - r);
};
it = function(e, r) {
  const n = document.createElement("canvas"), f = n.getContext("2d");
  n.width = e.naturalWidth, n.height = e.naturalHeight, f.drawImage(e, 0, 0);
  const u = Math.round(r.left * e.naturalWidth), o = Math.round(r.top * e.naturalHeight), t = 10, h = Math.max(0, u - t), c = Math.max(0, o - t), s = Math.min(t * 2, e.naturalWidth - h), a = Math.min(t * 2, e.naturalHeight - c), l = f.getImageData(h, c, s, a).data, v = [];
  for (let p = 0; p < l.length; p += 4) {
    const m = l[p], S = l[p + 1], P = l[p + 2];
    l[p + 3] > 0 && v.push([m, S, P]);
  }
  const w = v.length;
  if (w === 0)
    return {
      average: [128, 128, 128],
      brightest: [255, 255, 255],
      palette: [[128, 128, 128], [255, 255, 255], [0, 0, 0]]
    };
  const b = Math.round(v.reduce((p, m) => p + m[0], 0) / w), M = Math.round(v.reduce((p, m) => p + m[1], 0) / w), E = Math.round(v.reduce((p, m) => p + m[2], 0) / w), _ = [b, M, E], x = C(this, y, j).call(this, v), d = [];
  d.push(_), d.push(x);
  for (let p = 0; p < Math.min(v.length, 10); p += Math.max(1, Math.floor(v.length / 8)))
    d.push(v[p]);
  return d.push(C(this, y, K).call(this, _)), d.push([Math.min(255, b + 40), Math.min(255, M + 40), Math.min(255, E + 40)]), d.push([Math.max(0, b - 40), Math.max(0, M - 40), Math.max(0, E - 40)]), { average: _, brightest: x, palette: d };
};
Q = function() {
  if (!this._previewImage) return;
  let e, r, n;
  if (this._focalPoint) {
    const t = C(this, y, it).call(this, this._previewImage, this._focalPoint);
    e = t.average, r = t.brightest, n = t.palette;
  } else
    e = F(this, L).getColor(this._previewImage), n = F(this, L).getPalette(this._previewImage, 20, 10), r = C(this, y, j).call(this, n);
  const f = C(this, y, K).call(this, e);
  this._average = C(this, y, B).call(this, e), this._brightest = C(this, y, B).call(this, r), this._opposite = C(this, y, B).call(this, f), this._textColour = C(this, y, nt).call(this, e);
  const u = {
    average: this._average,
    brightest: this._brightest,
    opposite: this._opposite,
    textColour: this._textColour
  }, o = JSON.stringify(u);
  o !== F(this, U) && (I(this, R, u), I(this, W, o), I(this, U, o), this.value = o, this.dispatchEvent(new tt()));
};
at = function() {
  this._previewImage && C(this, y, Q).call(this);
};
st = function() {
  this._average = void 0, this._brightest = void 0, this._opposite = void 0, this._textColour = void 0, I(this, R, void 0), I(this, W, void 0), I(this, U, void 0), this.value = void 0, this.dispatchEvent(new tt());
};
O = function(e, r) {
  return r ? A`<uui-color-swatch show-label label=${e} value=${r}></uui-color-swatch>` : ht;
};
k([
  $()
], T.prototype, "_imgSrc", 2);
k([
  ct("#preview")
], T.prototype, "_previewImage", 2);
k([
  $()
], T.prototype, "_average", 2);
k([
  $()
], T.prototype, "_brightest", 2);
k([
  $()
], T.prototype, "_opposite", 2);
k([
  $()
], T.prototype, "_textColour", 2);
k([
  $()
], T.prototype, "_focalPoint", 2);
k([
  lt({ attribute: !1 })
], T.prototype, "value", 1);
T = k([
  ut("property-editor-ui-media-colour-finder")
], T);
export {
  T as WscPropertyEditorUIMediaColorFinderElement,
  T as element
};
//# sourceMappingURL=property-editor-ui-media-colour-finder.element-DU1gL53i.js.map
