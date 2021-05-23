export default  class ValidationExpModel {
    constructor(key,fieldName, expression, message, compareWith) {
        this.key = key;
        this.fieldName = fieldName;
        this.expression = expression;
        this.message = message;
        this.compareWith = compareWith;
    }
}

