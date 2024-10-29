<?php

namespace strtob\yii2AssetTollkit;

use yii\web\AssetBundle;

class DropzoneAsset extends AssetBundle
{

    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/resource/node_modules/dropzone/dist';
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
