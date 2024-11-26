namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

class VsivilityManagerAsset extends AssetBundle
{
    
    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/'; // Adjust path if necessary

    public $css = [
        'node_modules/toastr/build/toastr.min.css',
    ];

    public $js = [      
        'js/VsivilityManagerAsset.js',
    ];

    public $depends = [
        'yii\web\YiiAsset'
    ];
}
