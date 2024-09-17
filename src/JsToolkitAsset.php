<?php

namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

class JsToolkitAsset extends AssetBundle
{
    // The path to the toastr.js files in node_modules
    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/'; // Adjust path if necessary

    public $css = [
        'node_modules/toastr/build/toastr.min.css',
    ];

    public $js = [
        'node_modules/toastr/build/toastr.min.js',
        'js/toastrConfig.js',
        'js/lib.js',
        'js/tools.js',
    ];

    public $depends = [
        'yii\web\YiiAsset'
    ];
}
