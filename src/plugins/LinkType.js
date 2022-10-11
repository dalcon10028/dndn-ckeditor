import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview'
import SwitchButtonView from '@ckeditor/ckeditor5-ui/src/button/switchbuttonview'
import Plugin from '@ckeditor/ckeditor5-core/src/plugin'
import LinkUI from '@ckeditor/ckeditor5-link/src/linkui'

export class LinkType extends Plugin {
  init() {
    const { editor } = this
    const linkUI = editor.plugins.get(LinkUI)

    this.linkFormView = linkUI.formView
    this.button = this._createButton()

    this.linkFormView.once('render', () => {
      // Render button's tamplate.
      this.button.render()

      // Register the button under the link form view, it will handle its destruction.
      this.linkFormView.registerChild(this.button)

      // Inject the element into DOM.
      this.linkFormView.element.insertBefore(this.button.element, this.linkFormView.saveButtonView.element)
    })
  }

  _createButton() {
    const { editor } = this
    const button = new SwitchButtonView(this.locale)
    const linkCommand = editor.commands.get('link')

    button.set({
      label: '링크타입',
      withText: true,
      tooltip: '링크타입을 선택해주세요.',
    })

    // Probably this button should be also disabled when the link command is disabled.
    // Try setting editor.isReadOnly = true to see it in action.
    button.bind('isEnabled').to(linkCommand)

    button.on('execute', () => {
      // Do something (like open the popup), then update the link URL field's value.
      // The line below will be probably executed inside some callback.
      this.linkFormView.urlInputView.value = 'http://some.internal.link'
    })

    return button
  }
}
