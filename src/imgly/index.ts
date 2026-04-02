/**
 * CE.SDK PSD Template Import Editor - Initialization Module
 *
 * Exports only the init function for the PSD template import editor.
 *
 * @see https://img.ly/docs/cesdk/js/features/
 */

import CreativeEditorSDK from '@cesdk/cesdk-js';

import {
  BlurAssetSource,
  ColorPaletteAssetSource,
  CropPresetsAssetSource,
  DemoAssetSources,
  EffectsAssetSource,
  FiltersAssetSource,
  PagePresetsAssetSource,
  StickerAssetSource,
  TextAssetSource,
  TextComponentAssetSource,
  TypefaceAssetSource,
  UploadAssetSources,
  VectorShapeAssetSource
} from '@cesdk/cesdk-js/plugins';

import { PsdTemplateImportConfig } from './config/plugin';

export interface InitPsdTemplateImportEditorOptions {
  onClose?: () => void;
}

/**
 * Initialize the CE.SDK editor for PSD template import workflow.
 *
 * This function configures the editor with:
 * - PSD-specific UI configuration
 * - Asset sources for editing
 * - Export and upload actions
 * - Navigation components
 *
 * @param cesdk - The CreativeEditorSDK instance
 * @param options - Optional configuration (onClose callback)
 */
export async function initPsdTemplateImportEditor(
  cesdk: CreativeEditorSDK,
  options: InitPsdTemplateImportEditorOptions = {}
) {
  const { onClose } = options;

  // Add PSD template import configuration plugin
  await cesdk.addPlugin(new PsdTemplateImportConfig());

  // Hide page titles
  cesdk.engine.editor.setSetting('page/title/show', false);

  // Add asset source plugins
  await cesdk.addPlugin(new BlurAssetSource());
  await cesdk.addPlugin(new ColorPaletteAssetSource());
  await cesdk.addPlugin(new CropPresetsAssetSource());
  await cesdk.addPlugin(
    new UploadAssetSources({ include: ['ly.img.image.upload'] })
  );
  await cesdk.addPlugin(new DemoAssetSources({ include: ['ly.img.image.*'] }));
  await cesdk.addPlugin(new EffectsAssetSource());
  await cesdk.addPlugin(new FiltersAssetSource());
  await cesdk.addPlugin(new PagePresetsAssetSource());
  await cesdk.addPlugin(new StickerAssetSource());
  await cesdk.addPlugin(new TextAssetSource());
  await cesdk.addPlugin(new TextComponentAssetSource());
  await cesdk.addPlugin(new TypefaceAssetSource());
  await cesdk.addPlugin(new VectorShapeAssetSource());

  // Add back button if onClose callback provided
  if (onClose) {
    cesdk.ui.insertOrderComponent(
      { in: 'ly.img.navigation.bar', position: 'start' },
      { id: 'ly.img.back.navigationBar', onClick: onClose }
    );
  }

  // Add export actions to navigation bar
  cesdk.ui.insertOrderComponent(
    { in: 'ly.img.navigation.bar', position: 'end' },
    {
      id: 'ly.img.actions.navigationBar',
      children: [
        'ly.img.exportImage.navigationBar',
        'ly.img.exportPDF.navigationBar'
      ]
    }
  );

  // Register export action
  cesdk.actions.register('exportDesign', async (exportOptions) => {
    const { blobs, options } = await cesdk.utils.export(exportOptions);
    await cesdk.utils.downloadFile(blobs[0], options.mimeType);
  });

  // Register upload action
  cesdk.actions.register('uploadFile', (file, onProgress, context) => {
    return cesdk.utils.localUpload(file, context);
  });
}
