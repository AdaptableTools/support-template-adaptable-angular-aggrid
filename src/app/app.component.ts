import { Component } from '@angular/core';
import { GridOptions, Module, themeQuartz } from 'ag-grid-enterprise';
import {
  AdaptableApi,
  AdaptableOptions,
  AdaptableStateFunctionConfig,
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
    adaptableId: 'AdapTable Angular App', // Typically you will store State remotely; here we simply leverage local storage for convenience
    stateOptions: {
      persistState: (state, adaptableStateFunctionConfig) => {
        localStorage.setItem(
          adaptableStateFunctionConfig.adaptableStateKey,
          JSON.stringify(state)
        );
        return Promise.resolve(true);
      },
      loadState: (config: AdaptableStateFunctionConfig) => {
        return new Promise((resolve) => {
          let state = {};
          try {
            state =
              JSON.parse(
                localStorage.getItem(config.adaptableStateKey) as string
              ) || {};
          } catch (err) {
            console.log('Error loading state', err);
          }
          resolve(state);
        });
      },
    },
    initialState: {
      Dashboard: {
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
      theme: themeQuartz,
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
