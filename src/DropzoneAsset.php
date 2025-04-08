<?php

namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

class DropzoneAsset extends AssetBundle
{

    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/node_modules/dropzone/dist';
    public $css = [
        'dropzone.css',
    ];

    public $js = [
        'dropzone-min.js',
    ];

    public $depends = [
        'yii\web\YiiAsset'
    ];
}
