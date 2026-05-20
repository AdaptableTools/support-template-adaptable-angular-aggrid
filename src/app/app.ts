import { Component } from '@angular/core';
import {
  AdaptableAngularAgGridModule,
  AdaptableApi,
  AdaptableOptions,
  AdaptableReadyInfo,
} from '@adaptabletools/adaptable-angular-aggrid';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, Module, themeQuartz } from 'ag-grid-enterprise';

import { RECOMMENDED_MODULES } from './agGridModules';
import { columnDefs, defaultColDef } from './columnDefs';
import { rowData } from './rowData';

@Component({
  selector: 'app-root',
  imports: [AdaptableAngularAgGridModule, AgGridAngular],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  public agGridModules: Module[] = RECOMMENDED_MODULES;
  public adaptableApi?: AdaptableApi;

  public gridOptions: GridOptions = {
    theme: themeQuartz,
    defaultColDef,
    columnDefs,
    rowData,
  };

  public adaptableOptions: AdaptableOptions = {
    primaryKey: 'id',
    userName: 'demo-user',
    // licenseKey: '',
    adaptableId: 'AdapTable Angular App',
    // Typically you will store State remotely; here we simply leverage local storage for convenience
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

  adaptableReady = ({ adaptableApi }: AdaptableReadyInfo): void => {
    this.adaptableApi = adaptableApi;
    // use AdaptableApi for runtime access to Adaptable
  };
}
