import { Component } from '@angular/core';
import { GridOptions, Module } from 'ag-grid-enterprise';
import {
  AdaptableApi,
  AdaptableOptions,
} from '@adaptabletools/adaptable-angular-aggrid';
import { rowData } from './rowData';
import { RECOMMENDED_MODULES } from './agGridModules';
import { columnDefs, defaultColDef } from './columnDefs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public agGridModules: Module[] = RECOMMENDED_MODULES;
  public adaptableApi: AdaptableApi;
  public gridOptions: GridOptions;

  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'id',
    userName: 'demo-user',
    // licenseKey: <add_provided_license_key>,
    adaptableId: 'AdapTable Angular App',

    predefinedConfig: {
      Dashboard: {
        Revision: Date.now(),
        Tabs: [
          {
            Name: 'Default',
            Toolbars: ['Layout', 'Query'],
          },
        ],
      },
      Layout: {
        CurrentLayout: 'Standard Layout',
        Layouts: [
          {
            Name: 'Standard Layout',
            TableColumns: [
              'name',
              'language',
              'github_stars',
              'license',
              'created_at',
              'has_wiki',
              'updated_at',
              'pushed_at',
              'github_watchers',
              'open_issues_count',
              'closed_issues_count',
              'open_pr_count',
              'closed_pr_count',
              'description',
              'has_projects',
              'has_pages',
              'week_issue_change',
            ],
          },
        ],
      },
    },
  };

  constructor() {
    this.gridOptions = {
      theme: 'legacy',
      defaultColDef,
      columnDefs,
      rowData,
    };
  }

  adaptableReady = ({ adaptableApi }) => {
    this.adaptableApi = adaptableApi;
    // use AdaptableApi for runtime access to Adaptable
  };
}
