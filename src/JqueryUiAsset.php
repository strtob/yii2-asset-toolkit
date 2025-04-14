<?php

namespace strtob\yii2AssetToolkit;

use Yii;
use yii\web\AssetBundle;

class JqueryUiAsset extends AssetBundle
{
     // Pfad zu den jQuery UI Dateien in node_modules
     public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/node_modules/jquery-ui/dist';

     public $css = [
          'jquery-ui.min.css',
     ];

     public $js = [
          'jquery-ui.min.js',
     ];

     public $depends = [
          'yii\web\JqueryAsset',
     ];

     public function init()
     {
          parent::init();

          // Pfad zu lokalem Development-Asset (z. B. app/strtob/yii2-asset-toolkit/...)
          $localPath = Yii::getAlias('@app/strtob/yii2-asset-toolkit/rescource/node_modules/jquery-ui-dist');

          if (is_dir($localPath)) {
               $this->sourcePath = '@app/strtob/yii2-asset-toolkit/rescource/node_modules/jquery-ui-dist';
          } else {
               // Fallback auf Vendor-Asset (Composer)
               $this->sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/node_modules/jquery-ui-dist';
          }
     }
}
