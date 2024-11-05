<?php

namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

class BootstrapIconsAsset extends AssetBundle
{
    // The path to the toastr.js files in node_modules
    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/node_modules/bootstrap-icons'; 

    public $css = [
        'font/bootstrap-icons.min.css',
    ];

    public $js = [       
    ];

    public $depends = [        
    ];
}
