<?php

namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

class JqueryUiAsset extends AssetBundle
{
    // Pfad zu den jQuery UI Dateien in node_modules
    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/node_modules/jquery-ui-dist';

    public $css = [
        'jquery-ui.min.css',
    ];

    public $js = [
        'jquery-ui.min.js',
    ];

    public $depends = [
        'yii\web\JqueryAsset',
    ];
}
