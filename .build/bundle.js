/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/DemoSampleApp/i18n/i18n.properties":
/*!**************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/i18n/i18n.properties ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateFailure.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/AppUpdateFailure.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateSuccess.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/AppUpdateSuccess.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ClientIsMultiUserMode)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ClientIsMultiUserMode(clientAPI) {
    return clientAPI.isAppInMultiUserMode();
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/GetClientSupportVersions.js":
/*!***************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/GetClientSupportVersions.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientSupportVersions)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientSupportVersions(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    let versionStr = '';
    Object.keys(versionInfo).forEach(function(key, index) {
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        //console.log(`Key: ${key}   Index: ${index}`);
        if (key != 'Application Version') {
            versionStr += `${key}: ${versionInfo[key]}\n`;
        }
    });
    return versionStr;
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/GetClientVersion.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/GetClientVersion.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GetClientVersion)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GetClientVersion(clientAPI) {
    let versionInfo = clientAPI.getVersionInfo();
    if (versionInfo.hasOwnProperty('Application Version')) {
        return versionInfo['Application Version'];
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/OnWillUpdate.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/OnWillUpdate.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/DemoSampleApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return clientAPI.executeAction('/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action').then(
                (success) => Promise.resolve(success),
                (failure) => Promise.reject('Offline Odata Close Failed ' + failure));
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js":
/*!****************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetAppSettingsAndLogout(clientAPI) {
    let logger = clientAPI.getLogger();
    let platform = clientAPI.nativescript.platformModule;
    let appSettings = clientAPI.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = clientAPI.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return clientAPI.getPageProxy().executeAction('/DemoSampleApp/Actions/Application/Reset.action');
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
    context.count('/DemoSampleApp/Services/SampleServiceV4.service', 'ErrorArchive', '').then(errorCount => {
        if (errorCount > 0) {
            return context.getPageProxy().executeAction('/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function() {
                return Promise.reject(false);
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/LogLevels.js":
/*!********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/LogLevels.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LogLevels)
/* harmony export */ });
function LogLevels(clientAPI) {
    var levels = [];
    levels.push({
        'DisplayValue': 'Error',
        'ReturnValue': 'Error',
    });
    levels.push({
        'DisplayValue': 'Warning',
        'ReturnValue': 'Warn',
    });
    levels.push({
        'DisplayValue': 'Info',
        'ReturnValue': 'Info',
    });
    levels.push({
        'DisplayValue': 'Debug',
        'ReturnValue': 'Debug',
    });
    levels.push({
        'DisplayValue': 'Trace',
        'ReturnValue': 'Trace',
    });
    return levels;
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/SetTraceCategories.js":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/SetTraceCategories.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetTraceCategories)
/* harmony export */ });
function SetTraceCategories(clientAPI) {
    var logger = clientAPI.getLogger();
    const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
    const fcsection = sectionedTable.getSection('FormCellSection0');
    const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
    const odataTrace = fcsection.getControl('odataTrace');

    try {
        if (traceCategory.getValue()) {
            var values = traceCategory.getValue();
            var categories = [];

            if (values && values.length) {
                categories = values.map((value) => {
                    return 'mdk.trace.' + value.ReturnValue;
                });
            }
            clientAPI.setDebugSettings(odataTrace.getValue(), true, categories);
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/SetUserLogLevel.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/SetUserLogLevel.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetUserLogLevel)
/* harmony export */ });
function SetUserLogLevel(clientAPI) {
    try {
        if (clientAPI.getValue() && clientAPI.getValue()[0]) {
            var logger = clientAPI.getLogger();
            var listPickerValue = clientAPI.getValue()[0].ReturnValue;
            if (listPickerValue) {
                switch (listPickerValue) {
                    case 'Debug':
                        logger.setLevel('Debug');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Error':
                        logger.setLevel('Error');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Warn':
                        logger.setLevel('Warn');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Info':
                        logger.setLevel('Info');
                        ShowTraceOptions(clientAPI, false);
                        break;
                    case 'Trace':
                        logger.setLevel('Trace');
                        ShowTraceOptions(clientAPI, true);
                        break;
                    default:
                        // eslint-disable-next-line no-console
                        console.log(`unrecognized key ${listPickerValue}`);
                }
                return listPickerValue;
            }
        }
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

function ShowTraceOptions(clientAPI, tracingEnabled) {
    let categories = clientAPI.getPageProxy().getControl('SectionedTable').getControl('TracingCategoriesListPicker');
    let odataTrace = clientAPI.getPageProxy().getControl('SectionedTable').getControl('odataTrace');

    categories.setVisible(tracingEnabled);
    odataTrace.setVisible(tracingEnabled);
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/ToggleLogging.js":
/*!************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/ToggleLogging.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleLogging)
/* harmony export */ });
function ToggleLogging(clientAPI) {
    try {
        var logger = clientAPI.getLogger();
        const sectionedTable = clientAPI.getPageProxy().getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        let switchValue = enableLogSwitch.getValue();
        if (switchValue) {
            logger.on();
            logLevelListPicker.setVisible(true);
            logLevelListPicker.setEditable(true);
            logLevelListPicker.redraw();
        } else {
            logger.off();
            logLevelListPicker.setEditable(false);
            logLevelListPicker.setVisible(false);
            logLevelListPicker.redraw();
        }
        return switchValue;
    } catch (exception) {
        logger.log(String(exception), 'Error');
        return undefined;
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/TraceCategories.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/TraceCategories.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TraceCategories)
/* harmony export */ });
function TraceCategories(clientAPI) {
    var categories = ['action', 'api', 'app', 'binding', 'branding',
        'core', 'i18n', 'lcms', 'logging', 'odata', 'onboarding', 'profiling', 'push',
        'restservice', 'settings', 'targetpath', 'ui'
    ];

    var values = [];
    categories.forEach((category) => {
        values.push({
            'DisplayValue': category,
            'ReturnValue': category,
        });
    });

    return values;
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Logging/UserLogSetting.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Logging/UserLogSetting.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserLogSetting)
/* harmony export */ });
function UserLogSetting(clientAPI) {

    try {
        var logger = clientAPI.getLogger();

        const sectionedTable = clientAPI.getControl('SectionedTable');
        const fcsection = sectionedTable.getSection('FormCellSection0');
        const enableLogSwitch = fcsection.getControl('EnableLogSwitch');
        const logLevelListPicker = fcsection.getControl('LogLevelListPicker');
        const traceCategory = fcsection.getControl('TracingCategoriesListPicker');
        const odataTrace = fcsection.getControl('odataTrace');


        //Persist the user logging preferences
        if (logger) {
            console.log("in logger state");
            if (logger.isTurnedOn()) {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(true);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(true);
                }
            } else {
                if (enableLogSwitch) {
                    enableLogSwitch.setValue(false);
                }
                if (logLevelListPicker) {
                    logLevelListPicker.setEditable(false);
                }
            }
            var logLevel = logger.getLevel();
            if (logLevel) {
                if (logLevelListPicker) {
                    logLevelListPicker.setValue([logLevel]);
                }
            }
            if (logLevel === 'Trace') {
                traceCategory.setVisible(true);
                odataTrace.setVisible(true);
            }

            //Upon selecting a value in the List picker and clicking the back button 
            //will enable the onload page rule. This will set the selected value
            //in the control
            if (logLevelListPicker.getValue()[0]) {
                var returnValue = logLevelListPicker.getValue()[0].ReturnValue;
                if (returnValue) {
                    logLevelListPicker.setValue([returnValue]);
                    logger.setLevel(returnValue);
                }
            }
        }
    } catch (exception) {
        // eslint-disable-next-line no-console
        console.log(String(exception), 'Error User Logger could not be set');
    }
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Rules/Service/Initialize.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Rules/Service/Initialize.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Initialize)
/* harmony export */ });
function Initialize(context) {

    // Perform pre data initialization task

    // Initialize all your Data sources
    let _SampleServiceV4 = context.executeAction('/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action');

    //You can add more service initialize actions here

    return Promise.all([_SampleServiceV4]).then(() => {
        // After Initializing the DB connections

        // Display successful initialization  message to the user
        return context.executeAction({

            "Name": "/DemoSampleApp/Actions/GenericToastMessage.action",
            "Properties": {
                "Message": "Application Services Initialized",
                "Animated": true,
                "Duration": 1,
                "IsIconHidden": true,
                "NumberOfLines": 1
            }
        });
    }).catch(() => {
        return false;
    });
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let demosampleapp_actions_application_appupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdate.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdate.action")
let demosampleapp_actions_application_appupdatefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action")
let demosampleapp_actions_application_appupdateprogressbanner_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action")
let demosampleapp_actions_application_appupdatesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action")
let demosampleapp_actions_application_logout_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/Logout.action */ "./build.definitions/DemoSampleApp/Actions/Application/Logout.action")
let demosampleapp_actions_application_navtoabout_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/NavToAbout.action */ "./build.definitions/DemoSampleApp/Actions/Application/NavToAbout.action")
let demosampleapp_actions_application_navtoactivitylog_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/NavToActivityLog.action */ "./build.definitions/DemoSampleApp/Actions/Application/NavToActivityLog.action")
let demosampleapp_actions_application_navtosupport_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/NavToSupport.action */ "./build.definitions/DemoSampleApp/Actions/Application/NavToSupport.action")
let demosampleapp_actions_application_onwillupdate_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/OnWillUpdate.action */ "./build.definitions/DemoSampleApp/Actions/Application/OnWillUpdate.action")
let demosampleapp_actions_application_reset_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/Reset.action */ "./build.definitions/DemoSampleApp/Actions/Application/Reset.action")
let demosampleapp_actions_application_resetmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/ResetMessage.action */ "./build.definitions/DemoSampleApp/Actions/Application/ResetMessage.action")
let demosampleapp_actions_application_usermenupopover_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Application/UserMenuPopover.action */ "./build.definitions/DemoSampleApp/Actions/Application/UserMenuPopover.action")
let demosampleapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action")
let demosampleapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./DemoSampleApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action")
let demosampleapp_actions_closepage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ClosePage.action */ "./build.definitions/DemoSampleApp/Actions/ClosePage.action")
let demosampleapp_actions_customers_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Customers.action */ "./build.definitions/DemoSampleApp/Actions/Customers.action")
let demosampleapp_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let demosampleapp_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action")
let demosampleapp_actions_genericbannermessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericBannerMessage.action */ "./build.definitions/DemoSampleApp/Actions/GenericBannerMessage.action")
let demosampleapp_actions_genericmessagebox_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericMessageBox.action */ "./build.definitions/DemoSampleApp/Actions/GenericMessageBox.action")
let demosampleapp_actions_genericnavigation_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericNavigation.action */ "./build.definitions/DemoSampleApp/Actions/GenericNavigation.action")
let demosampleapp_actions_generictoastmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/GenericToastMessage.action */ "./build.definitions/DemoSampleApp/Actions/GenericToastMessage.action")
let demosampleapp_actions_logging_loguploadfailure_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/LogUploadFailure.action */ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadFailure.action")
let demosampleapp_actions_logging_loguploadsuccessful_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/LogUploadSuccessful.action */ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action")
let demosampleapp_actions_logging_uploadlog_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/UploadLog.action */ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLog.action")
let demosampleapp_actions_logging_uploadlogprogress_action = __webpack_require__(/*! ./DemoSampleApp/Actions/Logging/UploadLogProgress.action */ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLogProgress.action")
let demosampleapp_actions_sampleservicev4_service_closeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action")
let demosampleapp_actions_sampleservicev4_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action")
let demosampleapp_actions_sampleservicev4_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action")
let demosampleapp_actions_sampleservicev4_service_downloadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action")
let demosampleapp_actions_sampleservicev4_service_downloadstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action")
let demosampleapp_actions_sampleservicev4_service_initializeoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action")
let demosampleapp_actions_sampleservicev4_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action")
let demosampleapp_actions_sampleservicev4_service_syncfailuremessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action")
let demosampleapp_actions_sampleservicev4_service_syncstartedmessage_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action")
let demosampleapp_actions_sampleservicev4_service_uploadoffline_action = __webpack_require__(/*! ./DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action */ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action")
let demosampleapp_globals_application_appdefinition_version_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/AppDefinition_Version.global */ "./build.definitions/DemoSampleApp/Globals/Application/AppDefinition_Version.global")
let demosampleapp_globals_application_applicationname_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/ApplicationName.global */ "./build.definitions/DemoSampleApp/Globals/Application/ApplicationName.global")
let demosampleapp_globals_application_supportemail_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/SupportEmail.global */ "./build.definitions/DemoSampleApp/Globals/Application/SupportEmail.global")
let demosampleapp_globals_application_supportphone_global = __webpack_require__(/*! ./DemoSampleApp/Globals/Application/SupportPhone.global */ "./build.definitions/DemoSampleApp/Globals/Application/SupportPhone.global")
let demosampleapp_i18n_i18n_properties = __webpack_require__(/*! ./DemoSampleApp/i18n/i18n.properties */ "./build.definitions/DemoSampleApp/i18n/i18n.properties")
let demosampleapp_images_cartoonnetwork_png = __webpack_require__(/*! ./DemoSampleApp/Images/CartoonNetwork.png */ "./build.definitions/DemoSampleApp/Images/CartoonNetwork.png")
let demosampleapp_jsconfig_json = __webpack_require__(/*! ./DemoSampleApp/jsconfig.json */ "./build.definitions/DemoSampleApp/jsconfig.json")
let demosampleapp_pages_application_about_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Application/About.page */ "./build.definitions/DemoSampleApp/Pages/Application/About.page")
let demosampleapp_pages_application_support_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Application/Support.page */ "./build.definitions/DemoSampleApp/Pages/Application/Support.page")
let demosampleapp_pages_application_useractivitylog_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Application/UserActivityLog.page */ "./build.definitions/DemoSampleApp/Pages/Application/UserActivityLog.page")
let demosampleapp_pages_customers_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Customers.page */ "./build.definitions/DemoSampleApp/Pages/Customers.page")
let demosampleapp_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page")
let demosampleapp_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page")
let demosampleapp_pages_main_page = __webpack_require__(/*! ./DemoSampleApp/Pages/Main.page */ "./build.definitions/DemoSampleApp/Pages/Main.page")
let demosampleapp_rules_application_appupdatefailure_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/AppUpdateFailure.js */ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateFailure.js")
let demosampleapp_rules_application_appupdatesuccess_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/AppUpdateSuccess.js */ "./build.definitions/DemoSampleApp/Rules/Application/AppUpdateSuccess.js")
let demosampleapp_rules_application_clientismultiusermode_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js */ "./build.definitions/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js")
let demosampleapp_rules_application_getclientsupportversions_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/GetClientSupportVersions.js */ "./build.definitions/DemoSampleApp/Rules/Application/GetClientSupportVersions.js")
let demosampleapp_rules_application_getclientversion_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/GetClientVersion.js */ "./build.definitions/DemoSampleApp/Rules/Application/GetClientVersion.js")
let demosampleapp_rules_application_onwillupdate_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/OnWillUpdate.js */ "./build.definitions/DemoSampleApp/Rules/Application/OnWillUpdate.js")
let demosampleapp_rules_application_resetappsettingsandlogout_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js */ "./build.definitions/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js")
let demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let demosampleapp_rules_logging_loglevels_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/LogLevels.js */ "./build.definitions/DemoSampleApp/Rules/Logging/LogLevels.js")
let demosampleapp_rules_logging_settracecategories_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/SetTraceCategories.js */ "./build.definitions/DemoSampleApp/Rules/Logging/SetTraceCategories.js")
let demosampleapp_rules_logging_setuserloglevel_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/SetUserLogLevel.js */ "./build.definitions/DemoSampleApp/Rules/Logging/SetUserLogLevel.js")
let demosampleapp_rules_logging_togglelogging_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/ToggleLogging.js */ "./build.definitions/DemoSampleApp/Rules/Logging/ToggleLogging.js")
let demosampleapp_rules_logging_tracecategories_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/TraceCategories.js */ "./build.definitions/DemoSampleApp/Rules/Logging/TraceCategories.js")
let demosampleapp_rules_logging_userlogsetting_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Logging/UserLogSetting.js */ "./build.definitions/DemoSampleApp/Rules/Logging/UserLogSetting.js")
let demosampleapp_rules_service_initialize_js = __webpack_require__(/*! ./DemoSampleApp/Rules/Service/Initialize.js */ "./build.definitions/DemoSampleApp/Rules/Service/Initialize.js")
let demosampleapp_services_sampleservicev4_service = __webpack_require__(/*! ./DemoSampleApp/Services/SampleServiceV4.service */ "./build.definitions/DemoSampleApp/Services/SampleServiceV4.service")
let demosampleapp_styles_styles_css = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.css */ "./build.definitions/DemoSampleApp/Styles/Styles.css")
let demosampleapp_styles_styles_less = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.less */ "./build.definitions/DemoSampleApp/Styles/Styles.less")
let demosampleapp_styles_styles_light_css = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.css */ "./build.definitions/DemoSampleApp/Styles/Styles.light.css")
let demosampleapp_styles_styles_light_json = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.json */ "./build.definitions/DemoSampleApp/Styles/Styles.light.json")
let demosampleapp_styles_styles_light_nss = __webpack_require__(/*! ./DemoSampleApp/Styles/Styles.light.nss */ "./build.definitions/DemoSampleApp/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	demosampleapp_actions_application_appupdate_action : demosampleapp_actions_application_appupdate_action,
	demosampleapp_actions_application_appupdatefailuremessage_action : demosampleapp_actions_application_appupdatefailuremessage_action,
	demosampleapp_actions_application_appupdateprogressbanner_action : demosampleapp_actions_application_appupdateprogressbanner_action,
	demosampleapp_actions_application_appupdatesuccessmessage_action : demosampleapp_actions_application_appupdatesuccessmessage_action,
	demosampleapp_actions_application_logout_action : demosampleapp_actions_application_logout_action,
	demosampleapp_actions_application_navtoabout_action : demosampleapp_actions_application_navtoabout_action,
	demosampleapp_actions_application_navtoactivitylog_action : demosampleapp_actions_application_navtoactivitylog_action,
	demosampleapp_actions_application_navtosupport_action : demosampleapp_actions_application_navtosupport_action,
	demosampleapp_actions_application_onwillupdate_action : demosampleapp_actions_application_onwillupdate_action,
	demosampleapp_actions_application_reset_action : demosampleapp_actions_application_reset_action,
	demosampleapp_actions_application_resetmessage_action : demosampleapp_actions_application_resetmessage_action,
	demosampleapp_actions_application_usermenupopover_action : demosampleapp_actions_application_usermenupopover_action,
	demosampleapp_actions_closemodalpage_cancel_action : demosampleapp_actions_closemodalpage_cancel_action,
	demosampleapp_actions_closemodalpage_complete_action : demosampleapp_actions_closemodalpage_complete_action,
	demosampleapp_actions_closepage_action : demosampleapp_actions_closepage_action,
	demosampleapp_actions_customers_action : demosampleapp_actions_customers_action,
	demosampleapp_actions_errorarchive_errorarchive_syncfailure_action : demosampleapp_actions_errorarchive_errorarchive_syncfailure_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action : demosampleapp_actions_errorarchive_navtoerrorarchive_detail_action,
	demosampleapp_actions_errorarchive_navtoerrorarchive_list_action : demosampleapp_actions_errorarchive_navtoerrorarchive_list_action,
	demosampleapp_actions_genericbannermessage_action : demosampleapp_actions_genericbannermessage_action,
	demosampleapp_actions_genericmessagebox_action : demosampleapp_actions_genericmessagebox_action,
	demosampleapp_actions_genericnavigation_action : demosampleapp_actions_genericnavigation_action,
	demosampleapp_actions_generictoastmessage_action : demosampleapp_actions_generictoastmessage_action,
	demosampleapp_actions_logging_loguploadfailure_action : demosampleapp_actions_logging_loguploadfailure_action,
	demosampleapp_actions_logging_loguploadsuccessful_action : demosampleapp_actions_logging_loguploadsuccessful_action,
	demosampleapp_actions_logging_uploadlog_action : demosampleapp_actions_logging_uploadlog_action,
	demosampleapp_actions_logging_uploadlogprogress_action : demosampleapp_actions_logging_uploadlogprogress_action,
	demosampleapp_actions_sampleservicev4_service_closeoffline_action : demosampleapp_actions_sampleservicev4_service_closeoffline_action,
	demosampleapp_actions_sampleservicev4_service_closeofflinefailuremessage_action : demosampleapp_actions_sampleservicev4_service_closeofflinefailuremessage_action,
	demosampleapp_actions_sampleservicev4_service_closeofflinesuccessmessage_action : demosampleapp_actions_sampleservicev4_service_closeofflinesuccessmessage_action,
	demosampleapp_actions_sampleservicev4_service_downloadoffline_action : demosampleapp_actions_sampleservicev4_service_downloadoffline_action,
	demosampleapp_actions_sampleservicev4_service_downloadstartedmessage_action : demosampleapp_actions_sampleservicev4_service_downloadstartedmessage_action,
	demosampleapp_actions_sampleservicev4_service_initializeoffline_action : demosampleapp_actions_sampleservicev4_service_initializeoffline_action,
	demosampleapp_actions_sampleservicev4_service_initializeofflinefailuremessage_action : demosampleapp_actions_sampleservicev4_service_initializeofflinefailuremessage_action,
	demosampleapp_actions_sampleservicev4_service_syncfailuremessage_action : demosampleapp_actions_sampleservicev4_service_syncfailuremessage_action,
	demosampleapp_actions_sampleservicev4_service_syncstartedmessage_action : demosampleapp_actions_sampleservicev4_service_syncstartedmessage_action,
	demosampleapp_actions_sampleservicev4_service_uploadoffline_action : demosampleapp_actions_sampleservicev4_service_uploadoffline_action,
	demosampleapp_globals_application_appdefinition_version_global : demosampleapp_globals_application_appdefinition_version_global,
	demosampleapp_globals_application_applicationname_global : demosampleapp_globals_application_applicationname_global,
	demosampleapp_globals_application_supportemail_global : demosampleapp_globals_application_supportemail_global,
	demosampleapp_globals_application_supportphone_global : demosampleapp_globals_application_supportphone_global,
	demosampleapp_i18n_i18n_properties : demosampleapp_i18n_i18n_properties,
	demosampleapp_images_cartoonnetwork_png : demosampleapp_images_cartoonnetwork_png,
	demosampleapp_jsconfig_json : demosampleapp_jsconfig_json,
	demosampleapp_pages_application_about_page : demosampleapp_pages_application_about_page,
	demosampleapp_pages_application_support_page : demosampleapp_pages_application_support_page,
	demosampleapp_pages_application_useractivitylog_page : demosampleapp_pages_application_useractivitylog_page,
	demosampleapp_pages_customers_page : demosampleapp_pages_customers_page,
	demosampleapp_pages_errorarchive_errorarchive_detail_page : demosampleapp_pages_errorarchive_errorarchive_detail_page,
	demosampleapp_pages_errorarchive_errorarchive_list_page : demosampleapp_pages_errorarchive_errorarchive_list_page,
	demosampleapp_pages_main_page : demosampleapp_pages_main_page,
	demosampleapp_rules_application_appupdatefailure_js : demosampleapp_rules_application_appupdatefailure_js,
	demosampleapp_rules_application_appupdatesuccess_js : demosampleapp_rules_application_appupdatesuccess_js,
	demosampleapp_rules_application_clientismultiusermode_js : demosampleapp_rules_application_clientismultiusermode_js,
	demosampleapp_rules_application_getclientsupportversions_js : demosampleapp_rules_application_getclientsupportversions_js,
	demosampleapp_rules_application_getclientversion_js : demosampleapp_rules_application_getclientversion_js,
	demosampleapp_rules_application_onwillupdate_js : demosampleapp_rules_application_onwillupdate_js,
	demosampleapp_rules_application_resetappsettingsandlogout_js : demosampleapp_rules_application_resetappsettingsandlogout_js,
	demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js : demosampleapp_rules_errorarchive_errorarchive_checkforsyncerror_js,
	demosampleapp_rules_logging_loglevels_js : demosampleapp_rules_logging_loglevels_js,
	demosampleapp_rules_logging_settracecategories_js : demosampleapp_rules_logging_settracecategories_js,
	demosampleapp_rules_logging_setuserloglevel_js : demosampleapp_rules_logging_setuserloglevel_js,
	demosampleapp_rules_logging_togglelogging_js : demosampleapp_rules_logging_togglelogging_js,
	demosampleapp_rules_logging_tracecategories_js : demosampleapp_rules_logging_tracecategories_js,
	demosampleapp_rules_logging_userlogsetting_js : demosampleapp_rules_logging_userlogsetting_js,
	demosampleapp_rules_service_initialize_js : demosampleapp_rules_service_initialize_js,
	demosampleapp_services_sampleservicev4_service : demosampleapp_services_sampleservicev4_service,
	demosampleapp_styles_styles_css : demosampleapp_styles_styles_css,
	demosampleapp_styles_styles_less : demosampleapp_styles_styles_less,
	demosampleapp_styles_styles_light_css : demosampleapp_styles_styles_light_css,
	demosampleapp_styles_styles_light_json : demosampleapp_styles_styles_light_json,
	demosampleapp_styles_styles_light_nss : demosampleapp_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.css":
/*!***********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.css ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/noSourceMaps.js */ "../../../../css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.less":
/*!************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.less ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/noSourceMaps.js */ "../../../../css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.light.css":
/*!*****************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.css ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/noSourceMaps.js */ "../../../../css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.light.nss":
/*!*****************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.nss ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/noSourceMaps.js */ "../../../../css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/noSourceMaps.js":
/*!***********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/noSourceMaps.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Application/About.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Application/About.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"KeyAndValues":[{"_Name":"KeyValue0","KeyName":"User ID","Value":"#Application/#AppData/UserId","Visible":true},{"Value":"#Application/#AppData/DeviceId","_Name":"KeyValue1","KeyName":"Device ID","Visible":true},{"Value":"/DemoSampleApp/Globals/Application/ApplicationName.global","_Name":"KeyValue2","KeyName":"Application","Visible":true},{"Value":"/DemoSampleApp/Globals/Application/AppDefinition_Version.global","_Name":"KeyValue3","KeyName":"Application Metadata Version","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}},{"KeyAndValues":[{"Value":"/DemoSampleApp/Rules/Application/GetClientVersion.js","_Name":"KeyValue4","KeyName":"Client Version","Visible":"$(PLT,true,true,false)"},{"Value":"/DemoSampleApp/Rules/Application/GetClientSupportVersions.js","_Name":"KeyValue5","KeyName":"Client Support Versions","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue1","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"About","Caption":"About","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Application/Support.page":
/*!************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Application/Support.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","_Name":"SectionContactCellTable1","EmptySection":{"FooterVisible":false},"ContactCells":[{"ContactCell":{"_Name":"ContactCellItem0","Headline":"Contact Support","ActivityItems":[{"ActivityType":"Phone","ActivityValue":"/DemoSampleApp/Globals/Application/SupportPhone.global"},{"ActivityType":"Email","ActivityValue":"/DemoSampleApp/Globals/Application/SupportEmail.global"},{"ActivityType":"Message","ActivityValue":"/DemoSampleApp/Globals/Application/SupportPhone.global"}]}}]},{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":false,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.SimplePropertyCollection","_Name":"SectionSimplePropertyCollection0","Visible":"$(PLT,true,true,false)","EmptySection":{"FooterVisible":false},"SimplePropertyCells":[{"SimplePropertyCell":{"_Name":"SectionSimplePropertyCell0","KeyName":"Activity Log","AccessoryType":"DisclosureIndicator","Visible":"$(PLT,true,true,false)","OnPress":"/DemoSampleApp/Actions/Application/NavToActivityLog.action"}}],"Layout":{"NumberOfColumns":1,"MinimumInteritemSpacing":66}}]}],"_Type":"Page","_Name":"Settings","Caption":"Settings","PrefersLargeCaption":false,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"Done","SystemItem":"Done","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/CloseModalPage_Complete.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Application/UserActivityLog.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Application/UserActivityLog.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Controls":[{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"EnableLogSwitch","IsVisible":true,"Separator":true,"Caption":"Enable Logging","OnValueChange":"/DemoSampleApp/Rules/Logging/ToggleLogging.js","IsEditable":true},{"IsSearchEnabled":false,"_Type":"Control.Type.FormCell.ListPicker","_Name":"LogLevelListPicker","IsVisible":true,"Separator":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Log Level","OnValueChange":"/DemoSampleApp/Rules/Logging/SetUserLogLevel.js","IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":true,"AllowDefaultValueIfOneItem":false,"IsEditable":false,"PickerItems":"/DemoSampleApp/Rules/Logging/LogLevels.js"},{"_Type":"Control.Type.FormCell.ListPicker","_Name":"TracingCategoriesListPicker","IsVisible":false,"Separator":true,"AllowMultipleSelection":true,"AllowEmptySelection":true,"Caption":"Tracing Categories","PickerPrompt":"Select Categories for Tracing","OnValueChange":"/DemoSampleApp/Rules/Logging/SetTraceCategories.js","IsSelectedSectionEnabled":true,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"IsEditable":true,"PickerItems":"/DemoSampleApp/Rules/Logging/TraceCategories.js"},{"Value":false,"_Type":"Control.Type.FormCell.Switch","_Name":"odataTrace","IsVisible":false,"Separator":true,"Caption":"OData Tracing","OnValueChange":"/DemoSampleApp/Rules/Logging/SetTraceCategories.js","IsEditable":true}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection0"},{"Controls":[{"_Type":"Control.Type.FormCell.Button","_Name":"Send","IsVisible":true,"Separator":true,"Title":"Send Activity Log","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","ImagePosition":"Leading","Enabled":true,"OnPress":"/DemoSampleApp/Actions/Logging/UploadLogProgress.action"}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"FormCellSection1"}]}],"_Type":"Page","_Name":"UserActivityLog","Caption":"Activity Log","PrefersLargeCaption":false,"OnLoaded":"/DemoSampleApp/Rules/Logging/UserLogSetting.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Customers.page":
/*!**************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Customers.page ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ContactCell","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"Customers"},"_Name":"SectionContactCell0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"ContactCell":{"Visible":true,"ContextMenu":{"PerformFirstActionWithFullSwipe":true},"DetailImage":"","Headline":"{LastName}","Subheadline":"{FirstName}","Description":"{City}","ActivityItems":[{"_Name":"SectionContactCell0ActivityItems0","ActivityType":"Phone","ActivityValue":"{PhoneNumber}"},{"_Name":"SectionContactCell0ActivityItems1","ActivityType":"Email","ActivityValue":"{EmailAddress}"}]},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"Search":{"Enabled":true,"BarcodeScanner":true}}],"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"}}],"_Type":"Page","_Name":"Customers","Caption":"Customers","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page":
/*!***********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/DemoSampleApp/Services/SampleServiceV4.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"None","OnPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Pages/Main.page":
/*!*********************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Pages/Main.page ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":false,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.Image","_Name":"SectionImage0","Visible":true,"Image":"/DemoSampleApp/Images/CartoonNetwork.png","Alignment":"Center","ContentMode":"ScaleAspectFit"},{"_Type":"Section.Type.ButtonTable","_Name":"SectionButtonTable0","Visible":true,"EmptySection":{"FooterVisible":false},"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Buttons":[{"_Type":"ButtonTable.Type.Button","_Name":"ButtonTableTypeButton0","Title":"Customers","Alignment":"Center","ButtonType":"Text","Semantic":"Tint","Image":"sap-icon://customer","ImagePosition":"Leading","FullWidth":false,"Visible":true,"Enabled":true,"OnPress":"/DemoSampleApp/Actions/Customers.action"}],"Layout":{"LayoutType":"Vertical","HorizontalAlignment":"Leading"}}],"LoadingIndicator":{"Enabled":false,"Text":"Paging"}}],"_Type":"Page","_Name":"Main","Caption":"Main","PrefersLargeCaption":true,"ActionBar":{"Items":[{"_Name":"ActionBarItem0","Caption":"User Menu","Icon":"sap-icon://customer","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/DemoSampleApp/Actions/Application/UserMenuPopover.action"}],"_Name":"ActionBar1"}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"DemoSampleApp","Version":"/DemoSampleApp/Globals/Application/AppDefinition_Version.global","MainPage":"/DemoSampleApp/Pages/Main.page","OnLaunch":"/DemoSampleApp/Rules/Service/Initialize.js","OnWillUpdate":"/DemoSampleApp/Rules/Application/OnWillUpdate.js","OnDidUpdate":"/DemoSampleApp/Rules/Service/Initialize.js","Styles":"/DemoSampleApp/Styles/Styles.css","Localization":"/DemoSampleApp/i18n/i18n.properties","_SchemaVersion":"24.7","StyleSheets":{"Styles":{"css":"/DemoSampleApp/Styles/Styles.light.css","ios":"/DemoSampleApp/Styles/Styles.light.nss","android":"/DemoSampleApp/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/DemoSampleApp/Styles/Styles.light.nss","android":"/DemoSampleApp/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdate.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdate.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/DemoSampleApp/Rules/Application/AppUpdateFailure.js","OnSuccess":"/DemoSampleApp/Rules/Application/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdateFailureMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/DemoSampleApp/Actions/Application/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/AppUpdateSuccessMessage.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/Logout.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/Logout.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":true}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/NavToAbout.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/NavToAbout.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DemoSampleApp/Pages/Application/About.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/NavToActivityLog.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/NavToActivityLog.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"PageToOpen":"/DemoSampleApp/Pages/Application/UserActivityLog.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/NavToSupport.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/NavToSupport.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPage":true,"NavigationType":"Cross","PageToOpen":"/DemoSampleApp/Pages/Application/Support.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/OnWillUpdate.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/OnWillUpdate.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/Reset.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/Reset.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout","SkipReset":false}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/ResetMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/ResetMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","Title":"Reset","OKCaption":"Yes","OnOK":"/DemoSampleApp/Rules/Application/ResetAppSettingsAndLogout.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Application/UserMenuPopover.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Application/UserMenuPopover.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Enabled":true,"Icon":"sap-icon://synchronize","OnPress":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action","Title":"Sync Changes","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://headset","OnPress":"/DemoSampleApp/Actions/Application/NavToSupport.action","Title":"Support","Visible":true},{"Enabled":true,"Icon":"sap-icon://refresh","OnPress":"/DemoSampleApp/Actions/Application/AppUpdateProgressBanner.action","Title":"Check for Updates","Visible":"$(PLT,true,true,false)"},{"Enabled":true,"Icon":"sap-icon://hint","OnPress":"/DemoSampleApp/Actions/Application/NavToAbout.action","Title":"About","Visible":true},{"Enabled":true,"Icon":"sap-icon://reset","OnPress":"/DemoSampleApp/Actions/Application/ResetMessage.action","Title":"Reset","Visible":true},{"Enabled":true,"Icon":"sap-icon://log","OnPress":"/DemoSampleApp/Actions/Application/Logout.action","Title":"Logout","Visible":"/DemoSampleApp/Rules/Application/ClientIsMultiUserMode.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Cancel.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/CloseModalPage_Complete.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ClosePage.action":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ClosePage.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Customers.action":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Customers.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"Customers"},"PageToOpen":"/DemoSampleApp/Pages/Customers.page"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/DemoSampleApp/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericBannerMessage.action":
/*!*****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericBannerMessage.action ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","ActionResult":{"_Name":"GenericBannerMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericMessageBox.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericMessageBox.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"GenericMessageBox"},"Message":"Message","OKCaption":"OK"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericNavigation.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericNavigation.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","ActionResult":{"_Name":"GenericNavigation"},"PageToOpen":"/DemoSampleApp/Pages/Main.page"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/GenericToastMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/GenericToastMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","ActionResult":{"_Name":"GenericToastMessage"},"Message":"Message"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadFailure.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/LogUploadFailure.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Uploading log file failed with error: {#ActionResults:UploadLog/error}","OKCaption":"OK","Title":"Log Upload Failed","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":3,"IsIconHidden":false,"MaxNumberOfLines":1,"Message":"Log File Uploaded","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLog.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/UploadLog.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"ActionResult":{"_Name":"UploadLog"},"ActivityIndicatorText":"Uploading...","OnFailure":"/DemoSampleApp/Actions/Logging/LogUploadFailure.action","OnSuccess":"/DemoSampleApp/Actions/Logging/LogUploadSuccessful.action","ShowActivityIndicator":false,"_Type":"Action.Type.Logger.Upload"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/Logging/UploadLogProgress.action":
/*!**********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/Logging/UploadLogProgress.action ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionMessage":"Logs Uploaded","CompletionTimeout":2,"Message":"Uploading Log Files...","OnSuccess":"/DemoSampleApp/Actions/Logging/UploadLog.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOffline.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/DemoSampleApp/Services/SampleServiceV4.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action","OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineFailureMessage.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/CloseOfflineSuccessMessage.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action":
/*!************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action ***!
  \************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action","OnSuccess":"/DemoSampleApp/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action":
/*!*******************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action ***!
  \*******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOffline.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV4.service","DefiningRequests":[{"Name":"Customers","Query":"Customers"},{"Name":"Products","Query":"Products"},{"Name":"SalesOrderHeaders","Query":"SalesOrderHeaders"},{"Name":"SalesOrderItems","Query":"SalesOrderItems"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action":
/*!****************************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/InitializeOfflineFailureMessage.action ***!
  \****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/SyncStartedMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action","OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Actions/SampleServiceV4/Service/UploadOffline.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/DemoSampleApp/Services/SampleServiceV4.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/DemoSampleApp/Actions/SampleServiceV4/Service/DownloadStartedMessage.action","OnFailure":"/DemoSampleApp/Actions/SampleServiceV4/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/AppDefinition_Version.global":
/*!******************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/AppDefinition_Version.global ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/ApplicationName.global":
/*!************************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/ApplicationName.global ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"MDK App","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/SupportEmail.global":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/SupportEmail.global ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"support@mycompany.com","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Globals/Application/SupportPhone.global":
/*!*********************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Globals/Application/SupportPhone.global ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1-800-677-7271","_Type":"String"}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Services/SampleServiceV4.service":
/*!**************************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Services/SampleServiceV4.service ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV4","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"OfflineOptions":{"StoreParameters":{}},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Images/CartoonNetwork.png":
/*!*******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Images/CartoonNetwork.png ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "webpack/container/entry/bundle.js":
/*!***********************!*\
  !*** container entry ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var moduleMap = {
	".": () => {
		return Promise.resolve().then(() => (() => ((__webpack_require__(/*! ./build.definitions/application-index.js */ "./build.definitions/application-index.js")))));
	}
};
var get = (module, getScope) => {
	__webpack_require__.R = getScope;
	getScope = (
		__webpack_require__.o(moduleMap, module)
			? moduleMap[module]()
			: Promise.resolve().then(() => {
				throw new Error('Module "' + module + '" does not exist in container.');
			})
	);
	__webpack_require__.R = undefined;
	return getScope;
};
var init = (shareScope, initScope) => {
	if (!__webpack_require__.S) return;
	var name = "default"
	var oldScope = __webpack_require__.S[name];
	if(oldScope && oldScope !== shareScope) throw new Error("Container initialization failed as it has already been initialized with a different share scope");
	__webpack_require__.S[name] = shareScope;
	return __webpack_require__.I(name, initScope);
};

// This exports getters to disallow modifications
__webpack_require__.d(exports, {
	get: () => (get),
	init: () => (init)
});

/***/ }),

/***/ "./build.definitions/DemoSampleApp/Styles/Styles.light.json":
/*!******************************************************************!*\
  !*** ./build.definitions/DemoSampleApp/Styles/Styles.light.json ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/DemoSampleApp/jsconfig.json":
/*!*******************************************************!*\
  !*** ./build.definitions/DemoSampleApp/jsconfig.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"module":"esnext","target":"es2019","moduleResolution":"node","lib":["esnext","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	(() => {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = (name, initScope) => {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = (msg) => {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = undefined;
/******/ 			var register = (name, version, factory, eager) => {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = (id) => {
/******/ 				var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("webpack/container/entry/bundle.js");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;