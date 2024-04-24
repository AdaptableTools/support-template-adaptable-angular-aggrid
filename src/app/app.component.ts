import { Component } from '@angular/core';
import { GridOptions, Module } from '@ag-grid-community/core';
import {
  ActionColumnContext,
  AdaptableApi,
  AdaptableButton,
  AdaptableOptions,
} from '@adaptabletools/adaptable-angular-aggrid';
import { rowData } from './rowData';
import { RECOMMENDED_MODULES } from './agGridModules';
import { columnDefs } from './columnDefs';

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
    actionColumnOptions: {
      actionColumns: [
        {
          columnId: 'action',
          friendlyName: 'action',
          actionColumnButton: [
            {
              label: '',
              icon: {
                src: '../assets/adaptable_icon.svg',
                style: { height: 25, width: 25 },
              },
              hidden: (
                button: AdaptableButton<ActionColumnContext>,
                context: ActionColumnContext
              ) => {
                return false;
              },
              onClick: (
                button: AdaptableButton<ActionColumnContext>,
                context: ActionColumnContext
              ) => {
                console.log('Action');
              },
            },
          ],
        },
      ],
    },
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
        Revision: Date.now(),
        CurrentLayout: 'Default',
        Layouts: [
          {
            Name: 'Default',
            Columns: [
              'name',
              'language',
              'github_stars',
              'license',
              'week_issue_change',
              'created_at',
              'has_wiki',
              'updated_at',
              'pushed_at',
              'github_watchers',
              'description',
              'open_issues_count',
              'closed_issues_count',
              'open_pr_count',
              'closed_pr_count',
              'has_projects',
              'has_pages',
              'topics',
              'action',
            ],
            PinnedColumnsMap: {
              action: 'right',
            },
          },
        ],
      },
    },
  };

  constructor() {
    this.gridOptions = {
      columnDefs,
      rowData,
    };
  }

  adaptableReady = ({ adaptableApi }) => {
    this.adaptableApi = adaptableApi;
    // use AdaptableApi for runtime access to Adaptable
  };
}
