<?php

namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

class JQueryUiAsset extends AssetBundle
{

    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/node_modules/jquery-ui'; 

    public $css = [
        'dist/themes/base/jquery-ui.min.css',
        'dist/themes/base/theme.css',
        'themes/base/dragable.css',
    ];

    public $js = [
        'dist/jquery-ui.min.js',
    ];

    public $depends = [
        'yii\web\YiiAsset'
    ];
}
