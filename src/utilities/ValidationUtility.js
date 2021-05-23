import ValidationService from './../services/ValidationService';
import $ from 'jquery';
class ValidationUtility {

    constructor() {
        this.validationService = new ValidationService();
    }
    getFormErrors(state) {
        var validationErrorModel = [];
        var keys = Object.keys(state);
        // //console.log(keys)
        for( var i=0; i< keys.length; i++) {
            if(typeof(state[keys[i]]) != "object") {
                const error =this.validate(state,keys[i],state[keys[i]]);
                if(error != null) {
                    validationErrorModel.push(error);
                }
            }
        }
      return validationErrorModel;
    }
    isValidForm(state) {
        var isValid = true;
        Object.values(state.formError).forEach(val => {
          (val != null &&  val.length > 0) && (isValid = false);
        });
        return isValid;
    }

    isValidFormSelf(state, exclude) {
        var isValid = true;
        Object.entries(state.formError).forEach(entry => {
          //console.log(entry[0]+entry[1]);
          (entry[1] != null &&  entry[1].length > 0 && !exclude.includes(entry[0]) ) && (isValid = false);
        });
        return isValid;
    }

    validate(state, name, value) {
        return this.validationService.validate(state.validation[name], value, state);
    }
    
    setErrorMessage(validationError, currentComponent) {
        if(Array.isArray(validationError) && validationError.length) {
            for(var i=0; i< validationError.length; i++) {
                if(validationError[i].length) {
                    currentComponent.state.formError[validationError[i][0].formName] = validationError[i][0].formError;
                    currentComponent.setState({[currentComponent.state.formError[validationError[i][0].formName]]:validationError[i][0].formError})
                }
            }
        }
    }

    setSingleErrorMessage(validationError, formName, currentComponent,) {
        if(Array.isArray(validationError) && validationError.length) {
            for(var i=0; i< validationError.length; i++) {
                currentComponent.state.formError[validationError[i].formName] = validationError[i].formError;
                currentComponent.setState({[currentComponent.state.formError[validationError[i].formName]]:validationError[i].formError})
            }
        }
        else {
            currentComponent.state.formError[formName] = "";
            currentComponent.setState({[currentComponent.state.formError[formName]]: ""})
        }
    }

    clearGeneralMessage(currentComponent){
        var interval = setInterval(()=>{
            var formError = currentComponent.state.formError;
            formError.generalError = "";
            currentComponent.setState({[currentComponent.state.formError]:formError});
            clearInterval(interval);
        },10000);
    }
}
export default new ValidationUtility();