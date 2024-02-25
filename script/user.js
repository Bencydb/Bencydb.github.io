(function (core) {

    class User {
        get displayName() {
            return this._displayName;
        }

        set displayName(value) {
            this._displayName = value;
        }

        get username() {
            return this._username;
        }

        set username(value) {
            this._username = value;
        }

        constructor(displayName = "", username = "", password = "") {
            this._displayName = displayName;
            this._username = username;
            this._password = password;
        }

        toString() {
            return `DisplayName: ${this._displayName}\nUsername: ${this._username}`;
        }

        serialize() {
            if (this._displayName !== "" && this._username !== "") {
                return `${this._displayName},${this._username}`;
            }
            console.error("One or more of the User properties is missing or invalid.");
            return null;
        }

        deserialize(data) {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._username = propertyArray[1];
        }

        toJSON() {
            return {
                DisplayName: this._displayName,
                Username: this._username,
                Password: this._password
            };
        }

        fromJSON(data) {
            this._displayName = data.DisplayName;
            this._username = data.Username;
            this._password = data.Password;
        }
    }

    core.User = User;
})(core || (core = {}));
