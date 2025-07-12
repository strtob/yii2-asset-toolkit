<?php

namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

class VisTimelineAsset extends AssetBundle
{
    // Pfad zum Verzeichnis mit vis-timeline (angepasst auf dein Setup)
    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/';

    public $css = [
        'node_modules/vis-timeline/styles/vis-timeline-graph2d.min.css',
    ];

    public $js = [
        'node_modules/vis-timeline/standalone/umd/vis-timeline-graph2d.min.js',
    ];

    public $depends = [
        'yii\web\YiiAsset',
    ];
}
