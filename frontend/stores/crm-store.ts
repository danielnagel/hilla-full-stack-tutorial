import { makeAutoObservable, observable, runInAction } from 'mobx';

import Company from 'Frontend/generated/com/example/application/data/entity/Company';
import Contact from 'Frontend/generated/com/example/application/data/entity/Contact';
import Status from 'Frontend/generated/com/example/application/data/entity/Status';
import { CrmEndpoint } from 'Frontend/generated/endpoints';

export class CrmStore {
  contacts: Contact[] = [];
  companies: Company[] = [];
  statuses: Status[] = [];

  constructor() {
    makeAutoObservable(
        this,
        {
            initFromServer: false,
            contacts: observable.shallow,
            companies: observable.shallow,
            statuses: observable.shallow,
        },
        { autoBind: true }
    );

    this.initFromServer();
  }

  async initFromServer() {
    const data = await CrmEndpoint.getCrmData();
  
    runInAction(() => {
      this.contacts = data.contacts;
      this.companies = data.companies;
      this.statuses = data.statuses;
    });
  }

}