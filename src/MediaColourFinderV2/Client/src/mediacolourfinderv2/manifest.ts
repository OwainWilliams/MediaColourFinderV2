const editorUi: UmbExtensionManifest = {
  type: 'propertyEditorUi',
  alias: 'OC.MediaColourFinderV2',
  name: 'OC Media Colour Finder Property Editor UI',
  element: () => import('./property-editor-ui-media-colour-finder.element.js'),
  meta: {
    label: 'OC Media Colour Finder V2',
    icon: 'oc-media-colour-finder',
    group: 'common',
    propertyEditorSchemaAlias: 'Umbraco.Plain.String'
  },
};

export const manifests = [editorUi];
