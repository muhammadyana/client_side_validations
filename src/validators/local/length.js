import ClientSideValidations from '../../ClientSideValidations'

const LENGTH_CHECKS = {
  is: (a, b) => {
    return (a === b)
  },
  minimum: (a, b) => {
    return (a >= b)
  },
  maximum: (a, b) => {
    return (a <= b)
  }
}

ClientSideValidations.validators.local.length = function (element, options) {
  let blankOptions, check, message, length

  length = element.val().length

  blankOptions = {}
  blankOptions.message = options.is ? options.messages.is : options.minimum ? options.messages.minimum : void 0
  message = this.presence(element, blankOptions)

  if (message) {
    if (options.allow_blank === true) {
      return
    }

    return message
  }

  for (check in LENGTH_CHECKS) {
    if (!options[check]) {
      continue
    }

    if (!LENGTH_CHECKS[check](parseInt(length), parseInt(options[check]))) {
      return options.messages[check]
    }
  }
}