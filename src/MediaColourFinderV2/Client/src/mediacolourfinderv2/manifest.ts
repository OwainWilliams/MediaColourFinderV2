const editorUi: UmbExtensionManifest = {
  type: 'propertyEditorUi',
  alias: 'Our.Community.MediaColourFinderV2',
  name: 'Media Color Finder Property Editor UI',
  element: () => import('./property-editor-ui-media-colour-finder.element.js'),
  meta: {
    label: 'Media Color Finder',
    icon: 'oc-media-colour-finder',
    group: 'common',
    propertyEditorSchemaAlias: 'Umbraco.Plain.String'
  },
};

export const manifests = [editorUi];
