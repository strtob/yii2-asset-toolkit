# Project Name

## Description
This repository contains a collection of asset files for managing frontend libraries and frameworks in a Yii2 application. The files include:

- **BootstrapIconsAsset.php**: Asset bundle for integrating Bootstrap icons into your Yii2 application.
- **DropzoneAsset.php**: Asset bundle for adding drag-and-drop file upload functionality with Dropzone.js.
- **JsToolkitAsset.php**: Asset bundle for JavaScript toolkits to enhance client-side interactivity.
- **ToastrAsset.php**: Asset bundle for Toastr notifications for better user feedback.

## Installation

To install and use these assets in your Yii2 project, follow these steps:

1. Clone the repository:
    ```bash
    git clone git@github.com:your-username/your-repository.git
    ```

2. Move the asset files to your Yii2 application's `assets` directory, typically located at `@app/assets`.

## Usage

Include the assets in your application configuration or directly in your views. For example, you can include the Bootstrap Icons asset in your `AppAsset.php`:

```php
public $depends = [
    'app\assets\BootstrapIconsAsset',
    // other dependencies...
];
