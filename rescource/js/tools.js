
/**
 * Do all init actions after dom structure was build.
 */
$(document).ready(function () {

    console.log('general.js will be loaded...');
    //lastTabManagement();

    initListener();

    switchToTab();


    // sovle Select2 and Modal in case of bootstrap 5
    bootstrap.Modal.prototype._initializeFocusTrap = function () {
        return { activate: function () { }, deactivate: function () { } }
    };

});


$(document).on("pjax:timeout", function (event) {

    // Prevent default timeout redirection behavior
    event.preventDefault()

});

/**
 * Set all event listeners like modal button or links which have to follow the url
 * @returns {undefined}
 */
var initListener = function () {

    // listener deepl tranlsate
    $(document)
        .off('click', '.translateText')
        .on('click', '.translateText', function (e) {

            // text
            var elSourceText = $($(this).data('translate-source-element'));
            var elTargetText = $($(this).data('translate-target-element'));

            // translation direction
            var langTo = $(this).data('translate-lang-to');
            var langFrom = $(this).data('translate-lang-from');

            krajeeDialog.confirm("Are you sure you want to proceed, the existing text will be replaced?", function (result) {
                if (result) {

                    $.ajax({
                        url: '/service/translate',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            text: elSourceText.text(),
                            targetLanguage: langTo,
                            sourceLanguage: langFrom || undefined,
                        },
                        success: function (data) {
                            // target

                            if (data.error) {
                                toastr.error(lajax.t('Error') + data.message);
                                console.log(data);
                            } else {

                            }

                            elTargetText.text(data)
                        },
                        error: function (request, error) {
                            toastr.error(request.message);
                        }
                    });
                }
            });
        });

    // offcanvas load content
    $(document)
        .on('click', '[data-bs-toggle="offcanvas"]', function () {
            console.log('Offcanvas element click');
            var url = $(this).data('content-url');
            var container = $(this).data('bs-target');
            elTitle = $(container).find('#offcanvas-right-title');
            elBody = $(container).find('.offcanvas-body');
            elTitle.html($(this).data('bs-title'));
            // inital load
            loadAjaxInDiv(
                elBody,
                url
            );
        });

    // Handle key activities on input fields with class 'filename_fixed_ext'
    $(document)
        .on('input', 'input.filename_fixed_ext', function () {

            var inputField = $(this);

            // Check if the initial value data attribute exists
            if (typeof inputField.attr('initialValue') === 'undefined') {
                // Save the initial filename with extension in a data attribute
                inputField.attr('initialValue', inputField.val());
            } else {
                // Get the initial filename with extension
                var initialFilename = inputField.attr('initialValue');

                // Split the filename into name and extension
                var filenameParts = initialFilename.split('.');
                var filename = filenameParts[0];
                var extension = filenameParts[1];

                // Combine the new filename with the preserved extension
                var modifiedFilename = filename + '.' + extension;

                // Update the input field value with the modified filename
                inputField.val(modifiedFilename);
            }

        });


    // modal window listener to prevent row in case of action column
    $(document)
        .on('click', 'table tbody tr td', function () {

            if ($(this).hasClass('actioncolumn')) {
                console.log('Prevent row action due to action column.');
                return false;
            } else
                console.log('No action column, no prevent.')
        });

    $(document)
        .on('click', '.actionelement', function () {
            console.log('Prevent row action due to action column.');
            return false;

        });


    // Attach click event to elements with class 'copy-me'
    $('.copy-me')
        .on('click', function () {
            // Get the data-value attribute
            var dataValue = $(this).data('copyvalue');

            // Create a temporary textarea element to copy the text to clipboard
            var tempTextarea = $('<textarea>');
            tempTextarea.val(dataValue);
            $('body').append(tempTextarea);

            // Select the text in the textarea
            tempTextarea.select();
            tempTextarea[0].setSelectionRange(0, 99999); // For mobile devices

            // Copy the text to clipboard
            document.execCommand('copy');

            // Remove the temporary textarea
            tempTextarea.remove();

            // You can add additional actions or feedback here
            toastr.success(lajax.t('Value copied to clipboard: ' + dataValue));
        });

     
    // AJAX call when a button is clicked
    $(document).on('click', '.ajaxButton', function (event) {
        event.preventDefault(); // Prevent default action

        // Get invoker element and data attributes
        var invoker = $(this);
        var url = invoker.data('url'); // Get URL from data-url attribute
        var method = invoker.data('method') || 'GET'; // Default method is GET
        var parameter = invoker.data('parameter') || {}; // Optional parameters
        var showLoader = invoker.data('showLoader') !== undefined ? invoker.data('showLoader') : true; // Default to true if no value
        var showToastr = invoker.data('showToastr') !== undefined ? invoker.data('showToastr') : true; // Default to true if no value

        var successMessage = invoker.data('success-message') || 'Request successful!';
        var errorMessage = invoker.data('error-message') || 'An error occurred during the request.';

        // Perform AJAX request
        $.ajax({
            url: url,
            type: method,
            data: parameter,
            showLoader: showLoader,
            showToastr: showToastr,
            success: function (response) {
                // Handle success
                toastr.success(successMessage);
                console.log('Success:', response);
                // Additional actions (e.g., updating the page or reloading content)
            },
            error: function (xhr, status, error) {
                // Handle error
                toastr.error(errorMessage);
                console.log('Error:', xhr, status, error);
            }
        });
    });

    
    $(document).on('click', '.showModal', function (event) {
        console.log('showModal() listener');

        // Set invoker
        var invoker = $(this);

        // Set modal title
        var modalTitle = invoker.data('target-title') || 'Default Title';

        // Load URL
        var url = invoker.data('url');

        // Modal size (optional) from data attribute
        var modalSize = invoker.data('bs-target') || '';  // small, large, extra-large, fullscreen, or '' for default size

        console.log('Modal size: ' + modalSize);

        // Confirm button class (optional) from data attribute
        var confirmBtnClass = invoker.data('confirmbtnclass') || 'btn-success';  // Default is success

        // Get the generic modal element
        var elModal = $('#genericModal');

        // Find modal components
        var elModalTitle = elModal.find('.modal-title');
        var elModalBody = elModal.find('.modal-body');
        var elConfirmButton = elModal.find('#confirmButton'); // Assuming #confirmButton exists in the modal
        var elModalDialog = elModal.find('.modal-dialog'); // Modal dialog element for resizing

        // Set modal size by adding/removing the appropriate Bootstrap classes
        elModalDialog.removeClass('modal-sm modal-lg modal-xl modal-fullscreen'); // Remove existing size classes
        if (modalSize === 'small') {
            elModalDialog.addClass('modal-sm');
        } else if (modalSize === 'large') {
            elModalDialog.addClass('modal-lg');
        } else if (modalSize === 'extra-large' || modalSize === 'modal-xl') {
            elModalDialog.addClass('modal-xl');
        } else if (modalSize === 'fullscreen' || modalSize === 'modal-fullscreen') {
            elModalDialog.addClass('modal-fullscreen');
        }

        // Set modal title
        elModalTitle.html(modalTitle);

        // Set confirm button class
        if (elConfirmButton.length) {
            elConfirmButton.removeClass().addClass('btn ' + confirmBtnClass);
        }

        // Check if URL is defined and load the content via AJAX
        if (typeof url !== 'undefined') {
            console.log('Data URL ' + url + ' begin ajax load into modal ' + elModal.attr('id'));

            // AJAX request to load content into the modal
            $.ajax({
                url: url,
                type: 'GET',
                success: function (response) {
                    if (response) {

                        if (response.data && response.data.message) {

                            const message = response.data.message;
                            const messageDetails = response.data.messageDetails ? response.data.messageDetails : '';
                            const alertType = response.data.success === true ? 'success' : 'danger';
                            elModalBody.html('<div class="alert alert-' + alertType + '">' + message + '</div>' + messageDetails);
                        } else {
                            elModalBody.html(response);
                        }
                    }

                    // Show the modal after content is loaded
                    elModal.modal('show');
                },
                error: function (response) {
                    console.error("Error loading content into modal: ", response);
                    elModalBody.html('<div class="alert alert-danger">Failed to load content.</div>');
                    elModal.modal('show');
                }
            });
        } else {
            console.error('No data-url defined for this event.');
        }
    });



    // Listener: in case modal will be closed
    $(document)
        .on('hidden.bs.modal', function (event) {

            // check if pjax should be refreshed
            $model = $(this).find('#data-pjax-container');

            if (typeof $model.val() !== 'undefined') {
                console.log("Refresh pjax container: " + $model.val());
                // call refresh pjax function
                refreshPjax($model.val());

            } else
                console.log('data-pjax-container not defined in form.');


            // Clear the form                      
            elModalContent = $(this).find('#modal-content');
            elModalContent.empty();
            elModalContent.removeClass();
        });

    // Listener: Form with Ajax to submit for via ajax        
    $(document)
        .off('beforeSubmit')
        .on("beforeSubmit", "[id$=_ajax]", function (event) {

            if (stopAjaxBeforeSubmit) {
                console.log('Avoid Form submit by variable stopAjaxBeforeSubmit');
                return false; // abort the event handler
            } else
                console.log('Avoid Form submit by variable stopAjaxBeforeSubmit is false');

            console.log('Form submitted.');

            submitFormAsAjax($(this), event);

            return false;
        });

    // Listener: Form with Ajax to submit for via ajax for create
    $(document)
        .off('beforeSubmit', "[data-target-content='true']")
        .on('beforeSubmit', "[data-target-content='true']", function (event) {


            console.log('Form submitted with result to target content.');

            submitFormAsAjax($(this), event, '#content');
            return false;
        });

    // Listener: Navigate to url e.g. button
    $(document)
        .on('click', '.navigateToUrl',
            function (event) {

                /* set invoker */
                var invoker = $(this);
                /* load url */
                var url = invoker.data('url');
                window.location.assign(url);
            });


    // Listener: Opel <> Close div
    $(document).on('click', '.btToggle', function (event) {
        /* set invoker */
        var targetElementName = $(this).data('toggleelement');
        var targetElement = $(targetElementName);

        if (targetElement.length) {
            targetElement.toggle(500);

            // Toggle the rotation class on the clicked button
            $(this).toggleClass('rotate');
        } else {
            console.log('Target element "' + targetElementName + '" not found.');
        }

        return false; // Prevent default behavior (e.g., navigating to a link)
    });

    // execute link, optional in new window
    $(document)
        .off('click', '.followLinkValue')
        .on('click', '.followLinkValue', function (event) {
            if ($(this).data('value')) {
                if ($(this).data('newtab'))
                    window.open(
                        $(this).data('value'),
                        '_blank'
                    );
                else
                    window.location.href = $(this).data('value');
            } else
                alert('Trigger element has no data-value defined');
        });

    $(document)
        .off('click', '.followLinkValueSelect2')
        .on('click', '.followLinkValueSelect2', function (event) {

            if ($(this).data('value')) {
                console.log($(this).closest('.form-group').find('select.select2'));
                var linkRoute = $(this).data('value');
                var linkId = $(this).closest('.form-group').find('select.select2').val();


                var url = linkRoute + '/update?id=' + linkId

                if ($(this).data('newtab'))
                    window.open(url, '_blank');
                else
                    window.location.href = url;
            } else
                console.log('Trigger element has no data-value defined');
        });

    // Listener: Focus Tab
    $(document)
        .on('click', '.focusTab',
            function (event) {

                var $tab = $(this).data('tabid');
                var tabTargetId = $(this).data('tabtargetid');

                if (tabTarget) {

                    $tab.tabs("select", "#" + tabTargetId);

                }
            });

    $(document).on('click', '.requestAjaxUrl', function (event) {
        event.preventDefault(); // Prevent default action

        // Get invoker element and data attributes
        var invoker = $(this);
        var url = invoker.data('url');
        var method = invoker.data('method') || 'GET';
        var parameter = invoker.data('parameter') || {};
        var pjaxContainerIds = invoker.data('pjaxcontainerids') || '';
        var confirmationMessage = invoker.data('promptmessage');
        var title = invoker.data('title') || 'Default Title';
        var modalType = invoker.data('modaltype') || 'normal';
        var confirmBtnClass = invoker.data('confirmbtnclass') || 'btn-primary';

        // Get modal elements
        var $modalDialog = $('#modal-dialog');
        var $modalFooter = $('#modal-footer');
        var $confirmButton = $('#modal-footer .btn-success');
        var $cancelButton = $('#modal-footer .btn-secondary');

        // Initialize Bootstrap modal instance
        var modal = new bootstrap.Modal(document.getElementById('genericModal'));

        // Configure modal based on confirmation or content display
        if (confirmationMessage) {
            // Configure as a confirmation modal
            $modalDialog.removeClass('modal-xl modal-fullscreen').addClass('modal-sm');
            $modalFooter.show(); // Show footer for confirmation

            // Configure confirmation and cancel buttons
            $confirmButton
                .removeClass('btn-primary btn-danger btn-warning')
                .addClass(confirmBtnClass)
                .text('Confirm') // Set text based on purpose
                .off('click')
                .on('click', function () {
                    // Perform AJAX request on confirm button click
                    $.ajax({
                        url: url,
                        type: method,
                        data: parameter,
                        success: function (response) {
                            // Hide modal after successful request
                            modal.hide();
                            // Reload pjax containers if specified
                            if (pjaxContainerIds) {
                                $.pjax.reload({ container: pjaxContainerIds });
                            }
                            // Show success message
                            console.log(response);
                            ajaxMessage(response);
                        },
                        error: function (xhr) {
                            console.error("Error:", xhr);
                            $('.modal-body').text("An error occurred while processing your request.");
                        }
                    });
                });

            $cancelButton
                .text('Cancel')
                .off('click')
                .on('click', function () {
                    modal.hide();
                });

            // Set modal title and body
            $('#genericModalLabel').text(title);
            $('.modal-body').text(confirmationMessage);
        } else {
            // Configure as a content display modal
            if (modalType === 'fullscreen') {
                $modalDialog.removeClass('modal-xl modal-sm').addClass('modal-fullscreen');
            } else {
                $modalDialog.removeClass('modal-sm modal-fullscreen').addClass('modal-xl');
            }
            $modalFooter.hide(); // Hide footer for content-only modals

            // Set title and load content
            $('#genericModalLabel').text(title);
            $('.modal-body').load(url, parameter, function (response, status, xhr) {
                if (status === "error") {
                    $('.modal-body').text("An error occurred while loading the content.");
                }
            });
        }

        // Show the modal
        modal.show();
    });


    // Hide the footer when the modal closes
    $('#genericModal').on('hide.bs.modal', function () {
        $('#modal-footer').hide();
    });




    // show standard error
    $.ajaxSetup({
        beforeSend: function (jqXHR, settings) {
            // Default showToastr to true if not explicitly set
            settings.showToastr = settings.showToastr !== false;
        }
    });

    // Global AJAX Error Handling
    $(document).ajaxError(function (event, request, settings, thrownError) {
        var result = '';
        if (request.data !== undefined) {
            result = ' (' + request.data + ')';
        }

        // Only show Toastr if showToastr is true
        console.log('Show toaster ' + settings.showToastr);
        if (settings.showToastr) {
            toastr.error(
                lajax.t("An error in client call occurs. Please see the console for more details.") + result,
                lajax.t("Request Error")
            );
        }

        console.log(event);
        console.log(request);
        console.log(settings);
        console.log(thrownError);
    });


    // delete listener to prompt for delete button
    $(document)
        .on('click', '.btn-delete', function () {

            krajeeDialog
                .confirm(lajax.t('Are you really want to delete?'), function (result) {
                    if (result) {
                        alert('Great! You accepted!');
                    } else {
                        alert('Oops! You declined!');
                    }
                });
        });



}

/**
 * Function to switch to the specified tab based on URL parameters
 */
function switchToTab() {
    // Get URL parameters
    var urlParams = new URLSearchParams(window.location.search);

    // Retrieve tabContainer and tab parameters from the URL
    var tabContainerParam = urlParams.get('tabContainer');
    var tabParam = urlParams.get('tab');

    // Check if both tabContainer and tab parameters are present in the URL
    if (tabContainerParam && tabParam) {
        // Build the selector for the tab link based on tabContainer and tab parameters
        var tabLinkSelector = '#' + tabContainerParam + ' .nav-tabs a[href="#' + tabParam + '"]';

        // Find the tab link using the selector
        var tabLink = $(tabLinkSelector);

        // Check if the tab link is found
        if (tabLink.length > 0) {
            // Add 'active' class to the tab link
            tabLink.addClass('active');

            // Find the corresponding tab content using the href attribute of the tab link
            var tabContent = $(tabLink.attr('href'));

            // Check if the tab content is found
            if (tabContent.length > 0) {
                // Add 'show' and 'active' classes to the tab content
                tabContent.addClass('show active');
            }
        }
    }
}



/*
 * Open a modal based on the parameters.
 * @param {type} title
 * @param {type} url
 * @param {type} data
 * @param {type} modalId
 * @param {type} modalCopyId If this value is set, the orign modalId will be copy with this id
 * @returns {undefined}
 */
var showModal = function (title, url, data = null, modalId = 'modal-normal', modalCopyId = '', modalSize = '') {

    // Define the modal element
    var elModal;

    // If a copy ID is provided, duplicate the modal, otherwise use the original modal ID
    if (modalCopyId === '') {
        elModal = $('#' + modalId);
    } else {
        console.log('Use new element ' + modalCopyId);
        elModal = $(copyElement(modalId, modalCopyId));
    }

    // Modal components
    var elModalTitle = elModal.find('.modal-title');
    var elModalBody = elModal.find('.modal-body');
    var elModalFooter = elModal.find('.modal-footer');
    var elModalDialog = elModal.find('.modal-dialog'); // Modal dialog element for resizing

    // Set modal size class based on the passed parameter (default to normal size if not provided)
    elModalDialog.removeClass('modal-sm modal-lg modal-xl modal-fullscreen'); // Remove any existing size class
    if (modalSize === 'small') {
        elModalDialog.addClass('modal-sm');
    } else if (modalSize === 'large') {
        elModalDialog.addClass('modal-lg');
    } else if (modalSize === 'extra-large') {
        elModalDialog.addClass('modal-xl');
    } else if (modalSize === 'fullscreen') {
        elModalDialog.addClass('modal-fullscreen');
    } // Default is normal size, so no class is added if none is specified

    // Set modal title
    if (typeof title !== 'undefined') {
        elModalTitle.html(title);
    } else {
        elModalTitle.html('');
    }

    // Check if URL is defined and proceed with the AJAX request to load content
    if (typeof url !== 'undefined') {
        console.log('Data URL ' + url + ' will be loaded into the modal.');
        elModalBody.html(''); // Clear the modal body before loading

        // Make the AJAX request
        $.ajax({
            url: url,
            type: 'GET',
            data: data,
            success: function (response) {
                // Load the response into the modal body
                elModalBody.html(response);
                // Show the modal after content is loaded
                elModal.modal('show');
            },
            error: function (xhr, status, error) {
                console.log("Error loading modal content: " + status + " - " + error);
                elModalBody.html('<div class="alert alert-danger">An error occurred while loading the content.</div>');
                elModal.modal('show');
            }
        });
    } else {
        console.log('No data-url parameter defined.');
    }

    return elModal;
};



/**
 * Save the latest tab and show it.
 * @returns {undefined}
 */
var lastTabManagement = function () {

    // current path
    path = $(location).attr('pathname');
    controllAction = path.substring(path.lastIndexOf('/') + 1);
    // show saved tabs
    if (controllAction != 'create') {

        $('.nav-pills a[href="' + getCookie(window.location + '-lastTab') + '"]').tab('show');
        console.log('Last open tab: ' + getCookie('lastTab'));
    } else {
        $('.nav-tabs a[href="#w20-tab0"]').tab('show');
        var addressValue = $(this).attr("href");
        setCookie(window.location + '-lastTab', addressValue, 100);
    }

    $(".nav-link").click(function () {
        var addressValue = $(this).attr("href");
        setCookie(window.location + '-lastTab', addressValue, 100);
    });
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; samesite=strict";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
};
/**
 * Generate Toastr Message. This will be used on AJAX calls.
 * @param {type} response
 * @returns {Boolean}
 */

var ajaxMessage = function (response) {
    console.log('Show notification.');
    if (!response) {
        console.log('Response parameter in call of ajaxMessage not defined!');
        return false;
    }

    if (!response.data) {
        console.log('Response.data parameter in call of ajaxMessage not defined!');
        return false;
    }

    if (response.data.success === true) {
        // show success message
        toastr.success(response.data.message, response.data.title);


        // check if redirect
        if (response.data.redirectUrl != null) {
            if (response.data.redirectTarget != null) {
                console.log('Redirect to: ' + response.data.redirectUrl + ' with target: ' + response.data.redirectTarget);
                loadAjaxInDiv(response.data.redirectTarget, response.data.redirectUrl);
            } else {

                console.log('Redirect to: ' + response.data.redirectUrl);
                window.location.href = response.data.redirectUrl;
            }
        }
    }
    else {
        if (response.data.message != null)
            toastr.error(response.data.message, response.data.title);
        else
            toastr.error(lajax.t("Response report an error. Please see the console for more details."), lajax.t("Response Error"));
        console.log(response.data);
    }

}

/**
 * Refresh one or more pjax container, if more than one must be comma separated
 * @param {type} containerids
 * @returns {Boolean}
 */
var refreshPjax = function (containerids) {
    console.log(containerids);

    if (containerids === undefined) {
        console.log('refreshPjax(): Parameter containerids not defined.');
        toastr.warning(lajax.t("Error in configuration. Couldn't refresh list."));
        return false;
    }

    /* case: ajax container separated by commas */
    if (typeof containerids === 'string') {
        try {
            console.log('refreshPjax(): Try to reload pjax container (source string): ' + containerids)
            $.pjax.reload({
                container: containerids,
                timeout: false,
                replace: false,
                push: false,
            }).done(function () {

                // check if exists
                if ($(containerids + '-counter').length > 0) {
                    console.log('refreshPjax(): Try to reload pjax container (source string): ' + containerids + '-counter');
                    $.pjax.reload({
                        container: containerids + '-counter',
                        timeout: false,
                        replace: false,
                        push: false,
                    });
                }

            });


        } catch (e) {
            console.log(e);
        }

    } else if (typeof containerids === 'object') {

        containerids.forEach(element => {
            try {
                console.log('refreshPjax(): Try to reload pjax container (source object): ' + element)
                console.log('Url set to: ' + element.url)
                $.pjax.reload({
                    container: element.container,
                    timeout: false,
                    url: element.url,
                });
            } catch (e) {
                console.log(e);
            }
        });
    } else {
        console.log('refresPjax(): containerIds are no string or array, can not handle!');
        console.log('Have: ' + containerids);
    }
}


/**
 * Form submission as AJAX.
 * @param {type} form
 * @param {type} event
 * @returns {Boolean}
 */

var submitFormAsAjax = function (form, event, targetDiv = null) {
    console.log('submitFormAsAjax(): action');
    // return false if form still have some validation errors
    if (form.find('.has-error').length) {
        // with errors, do not submit form by any means
        return false;
    }

    console.log('Try to find relevant modal');
    var modal = form.parents('.modal');
    console.log("Relevant Modal Form identified as: ");
    console.log(modal);
    console.log("=====================");
    if (typeof modal !== 'undefined') {
        // clear modal content
        var modalContentMessage = $('#modal-content-message');
        modalContentMessage.empty();
        modalContentMessage.removeClass();
    }


    // Submit form as AJAX (if no errors)
    $.ajax({
        url: form.attr('action'),
        type: 'POST',
        data: form.serializeArray(),
    })
        .done(function (response) {
            if ((typeof response.data !== "undefined") && (response.data.success === true)) {

                // remove validation check in input fields
                form.find('.is-valid').removeClass('is-valid');

                /* Call function after ajax call from form attribute: data-afterajaxcall  */
                afterAjaxSuccess = form.data('afterajaxsuccess');

                if (afterAjaxSuccess != undefined)
                    executeObjFncByName(afterAjaxSuccess);
                else
                    console.log('No function to call after ajax defined.');

                /* Ajax reload will be handle in tools.js with hidden.bs.modal event */
                if (form.data('pjax-container') != undefined) {

                    /* Pjax Url manually set */
                    if (form.data('pjax-url') != undefined) {
                        console.log("Pjax url set to: " + form.data('pjax-url'));
                    }

                    console.log("Refresh pjax container: " + form.data('pjax-container'));
                    // call refresh pjax function
                    refreshPjax(form.data('pjax-container'));

                } else
                    console.log('data-pjax-container not defined in form.');


                // Check if db_locks is defined in the response data
                if (response.data.db_locks !== undefined) {
                    // Loop through each db_lock entry in the db_locks object
                    for (var modelName in response.data.db_locks) {
                        if (response.data.db_locks.hasOwnProperty(modelName)) {
                            // Create the id based on model name
                            var id = modelName.toLowerCase() + '-db_lock';
                            // Get the version from db_locks
                            var version = response.data.db_locks[modelName];
                            // Update the db_lock field
                            updateDbLock(id, version);
                        }
                    }
                }
                else {
                    console.log('Db_lock not updated!');
                    console.log(response.data);
                }

                // close modal      
                if (typeof modal !== 'undefined')
                    modal.modal('hide');

                // show success message
                ajaxMessage(response);


            } else {
                console.log("submitFormAsAjax(): Error validation and saving record");

                modalContentMessage.addClass("alert alert-danger");

                modalContentMessage.append('ERROR:<ul id="error-list" style="list-style-type: decimal"></ul>');

                $.each(response.data.Errors, function (index, items) {
                    $.each(items, function (index, item) {
                        $('#error-list').append('<li>' + item + '</li>');
                    });
                });
                if (typeof response.data !== "undefined") {
                    toastr.error(response.data.message, response.data.title);
                } else {
                    toastr.error(response.data.message);
                }
            }
            console.log("submitFormAsAjax(): Done");
            return false; // stop default form submission

        })
        .fail(function (response) {
            console.log("submitFormAsAjax(): Error:");
            toastr.error(response.data);
            console.log(response);
        });
}

/**
 * Load content via ajax into container
 * @param {string} containerId Name of container where response content shoudl be load in
 * @param {type} url Ajax request url
 * @param {type} data Additional parameter for request
 * @param {type} addionalSuccessFunciton Function to call after succesful request
 * @param {type} method Request method
 * @param {type} dataType Datatype to use for request, e.g. HTML, JSON, ...
 * @param {type} async Async or sync call
 * @returns {undefined}
 */

var loadAjaxInDiv = function (containerId, url, data, method = 'GET', dataType = 'HTML', async = false) {
    toggleSpinner(containerId, true);
    $.ajax({
        url: url,
        data: data,
        type: method,
        dataType: dataType,
        async: async,
        success: function (response) {
            // When the server returns a response, update the content of the div with the new content
            console.log('Load content to container ' + containerId)
            $(containerId).html(response);

            return true;
        },
        error: function (xhr, status, error) {
            toggleSpinner(containerId, false);
            $(containerId).html(generaterErrorDiv(xhr.responseText));
            return false;
        }
    });
}

/**
 * Execute objects and functions by name. Array needs to be in format {{object: <objectname>, function <functionname>},...}
 * @param {type} arrData Array of object/function values to execute
 * @returns {undefined}
 */
var executeObjFncByName = function (arrData) {

    arrData.forEach(function (s, i, o) {

        try {
            objName = s.object;
            funcName = s.function;
            console.log('Ty to call Object: ' + objName
                + ' with Function: ' + funcName);
            if (objName !== '') {
                // Access the object using the object name variable
                var targetObject = window[objName];
                targetObject[funcName]();
            } else {
                // function call w/o object
                window[funcName]();
            }


        } catch (e) {

            console.log(e);
        }

    });
}

/**
 * Update optimistic lock field in form by id and version number in params.
 * @param {type} id
 * @param {type} version
 * @returns {undefined}
 */
var updateDbLock = function (id = 'db_lock', version) {
    var elDb_lock = $('#' + id);
    console.log('Update db_lock value with id: ' + id + ' / version from ' + elDb_lock.attr('value') + ' to ' + version);
    elDb_lock.attr('value', version);
}


var requestAjaxUrl = function (url, pjaxContainerids, data = '', requestType = 'GET', showLoader = true) {
    // Submit form as AJAX (if no errors)
    $.ajax({
        url: url,
        data: data,
        type: requestType,
        showLoader: showLoader,
    })
        .done(function (response) {

            if ((typeof response.data !== "undefined") && (response.data.success === true)) {

                /* Ajax reload will be handle in tools.js with hidden.bs.modal event */
                console.log("Refresh pjax container: " + pjaxContainerids);
                // call refresh pjax function
                refreshPjax(pjaxContainerids);
                // show success message
                ajaxMessage(response);
            } else {

                if (typeof response.data !== "undefined") {
                    toastr.error(response.data.message, response.data.title);
                } else {
                    toastr.error(response.data.message);
                }
            }
            return false; // stop default form submission

        })
        .fail(function (response) {
            console.log("submitFormAsAjax(): Error:");
            console.log(response);
            if (response !== '')
                toastr.error(response.responseText);
        });
}




/**
 * Show spinner in div and can be switch on and off by parameter
 * @param {string} divId - ID of the target div
 * @param {boolean} show - Whether to show or hide the spinner
 * @returns {undefined}
 */
var toggleSpinner = function (divId, show) {
    var spinner =
        '<div class="loader d-flex justify-content-center align-items-center">' +
        '<div class="spinner spinner-border text-success" role="status"></div>' +
        '</div>';
    var targetDiv = $(divId);
    if (show) {
        // Show the spinner
        targetDiv.html(spinner);
    } else {
        // Hide the spinner
        targetDiv.html('');
    }
}


var handleError = function (msg, consoleOutput) {
    if (msg != '')
        msg = 'Error. Please see log for more information.';

    krajeeDialog.alert(msg);
    console.log(consoleOutput);
}

/**
 * Generate Div with error message which can be shown in a div.
 * @param {type} msg
 * @returns {String}
 */

var generaterErrorDiv = function (msg) {
    var msgDiv = '<div class="alert alert-danger alert-border-left alert-dismissible fade show mb-xl-0" role="alert">'
        + '<i class="ri-error-warning-line me-3 align-middle fs-16"></i><strong>'
        + msg
        + '</strong></div>';
    return msgDiv;
}



/**
 * Copy an html element, e.g. for copy modal window
 * @param {type} sourceId
 * @param {type} newId
 * @returns {Boolean}
 */
var copyElement = function (sourceId, newId) {
    // Check if the new element already exists
    if ($(newId).length > 0) {
        console.log('Element with planned new ID ' + newId + ' already exists - no copy have been made.');
        return newId;
    }

    // Get the source element
    var sourceElement = $(sourceId);

    // Check if the source element exists
    if (sourceElement.length === 0) {
        console.log('Source element with ID ' + sourceId + ' does not exist.');
        return newId;
    }

    // Clone the source element
    var clonedElement = sourceElement.clone();

    // Update the ID of the cloned element
    var newIdWithoutHash = newId.replace('#', '');
    clonedElement.attr('id', newIdWithoutHash);

    // Append the cloned element after the original element
    clonedElement.insertAfter(sourceElement);

    console.log('Element with ID ' + newId + ' copied successfully.');
    console.log($(newId));
    return newId;
}


// Function to calculate working days between two dates
var getWorkingDays = function (startDate, endDate) {
    return $.ajax({
        url: '/service/calculate-working-days', // Adjust the URL based on your application's structure
        data: {
            startDate: startDate,
            endDate: endDate
        },
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            return response.workingDays;
        },
        error: function (xhr, status, error) {
            toastr.error(request.message);
            console.error('Error calculating working days:', error);
        }
    });
}

var getRemainingDays = function (startDate, endDate) {
    return $.ajax({
        url: '/service/calculate-remaining-days', // Adjust the URL based on your application's structure
        data: {
            startDate: startDate,
            endDate: endDate
        },
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            return response;
        },
        error: function (xhr, status, error) {
            toastr.error(request.message);
            console.error('Error calculating remaining days:', error);
        }
    });
}
