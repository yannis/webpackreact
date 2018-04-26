export function setErrors(form, formErrors) {
  let errors = [];
  if (formErrors) {
    errors = formErrors.filter((error) => {
      return error[0] === form
    }).map((error) => {
      return error[1]
    })
    if (errors.length && errors[0] !== undefined ) {
      errors = errors[0]
    }
  }
  return errors
}

export function submitForm(e) {
  e.preventDefault();
  if (this.state.value) {
    let url = this.props.element ? this.props.element.links.self : this.props.unit.links.self + '/figures';
    let method = this.props.element ? 'patch' : 'post';
    let success = this.props.element ? Actions.UPDATE_BLOCK_AND_ELEMENT : Actions.ADD_BLOCK_AND_ELEMENT;
    let payload = {
      url,
      method,
      success,
      error: Actions.SET_FORM_ERROR,
      node: this.state.form,
      data: this.state.value,
    }
    this.props.actions.fetchData(payload);
  } else {
    this.props.cancelForm()
  }
}
