const frame = require("tns-core-modules/ui/frame");

const superProto = androidx.appcompat.app.AppCompatActivity.prototype;
androidx.appcompat.app.AppCompatActivity.extend("org.ertflixtv.MainActivity", {

    onCreate: function(savedInstanceState) {
        // Set the isNativeScriptActivity in onCreate (as done in the original NativeScript activity code)
        // The JS constructor might not be called because the activity is created from Android.
        this.isNativeScriptActivity = true;
        if(!this._callbacks) {
            frame.setActivityCallbacks(this);
        }
        // Modules will take care of calling super.onCreate, do not call it here
        this._callbacks.onCreate(this, savedInstanceState, this.getIntent(), superProto.onCreate);

        // Add custom initialization logic here
    },
    dispatchKeyEvent: function (event) {
        console.log("D-Pad center button pressed? " + (event.getKeyCode() === android.view.KeyEvent.KEYCODE_DPAD_CENTER));
        if(this.getCurrentFocus()){
        // let's highlight the element that currently has the focus
        const tnsButton = this.getCurrentFocus()["jsview"];
        if (tnsButton && tnsButton !== this.highlightedElement) {
            if(tnsButton.id === "menu" && event.getKeyCode() === android.view.KeyEvent.KEYCODE_DPAD_LEFT ){
                tnsButton.notify({eventName: "tap", object: tnsButton});}
            tnsButton.addPseudoClass("focused");
            if (this.highlightedElement) {
                this.highlightedElement.deletePseudoClass("focused");
                }
            this.highlightedElement = tnsButton;
        }
    }
        return superProto.dispatchKeyEvent.call(this, event);
    },

    onSaveInstanceState: function(outState) {
        this._callbacks.onSaveInstanceState(this, outState, superProto.onSaveInstanceState);
    },
    onStart: function() {
        this._callbacks.onStart(this, superProto.onStart);
    },
    onStop: function() {
        this._callbacks.onStop(this, superProto.onStop);
    },
    onDestroy: function() {
        this._callbacks.onDestroy(this, superProto.onDestroy);
    },
    onBackPressed: function() {
        this._callbacks.onBackPressed(this, superProto.onBackPressed);
    },
    onRequestPermissionsResult: function (requestCode, permissions, grantResults) {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined);
    },
    onActivityResult: function (requestCode, resultCode, data) {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, _super.prototype.onActivityResult);
    }
});