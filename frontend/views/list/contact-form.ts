import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { View } from 'Frontend/views/view';
import '@vaadin/button';
import '@vaadin/combo-box';
import '@vaadin/text-field';
import { Binder, field } from '@hilla/form';
import ContactModel from 'Frontend/generated/com/example/application/data/entity/ContactModel';
import { crmStore, uiStore } from 'Frontend/stores/app-store';
import { listViewStore } from './list-view-store';

@customElement('contact-form')
export class ContactForm extends View {
  protected binder = new Binder(this, ContactModel);

  constructor() {
    super();
    this.autorun(() => {
      if (listViewStore.selectedContact) {
        this.binder.read(listViewStore.selectedContact);
      } else {
        this.binder.clear();
      }
    });
  }

  render() {
    const { model } = this.binder;

    return html`
      <vaadin-text-field label="First name" ?disabled=${uiStore.offline} ${field(model.firstName)}></vaadin-text-field>
      <vaadin-text-field label="Last name" ?disabled=${uiStore.offline} ${field(model.lastName)}></vaadin-text-field>
      <vaadin-text-field label="Email" ?disabled=${uiStore.offline} ${field(model.email)}></vaadin-text-field>
      <vaadin-combo-box
        label="Status"
        ${field(model.status)}
        ?disabled=${uiStore.offline}
        item-label-path="name"
        .items=${crmStore.statuses}
      ></vaadin-combo-box>
      <vaadin-combo-box
        label="Company"
        ${field(model.company)}
        ?disabled=${uiStore.offline}
        item-label-path="name"
        .items=${crmStore.companies}
      ></vaadin-combo-box>

      <div class="flex gap-s">
        <vaadin-button theme="primary" ?disabled=${this.binder.invalid || uiStore.offline} @click=${this.save}>
          ${this.binder.value.id ? 'Save' : 'Create'}
        </vaadin-button>
        <vaadin-button theme="error" ?disabled=${this.binder.invalid || uiStore.offline} @click=${listViewStore.delete}>
          Delete
        </vaadin-button>
        <vaadin-button theme="tertiary" @click=${listViewStore.cancelEdit}> Cancel </vaadin-button>
      </div>
    `;
  }

  async save() {
    await this.binder.submitTo(listViewStore.save);
    this.binder.clear();
  }
}
