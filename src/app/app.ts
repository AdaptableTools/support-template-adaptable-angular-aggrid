import { Component } from '@angular/core';
import {
  AdaptableAngularAgGridModule,
  AdaptableApi,
  AdaptableOptions,
  AdaptableReadyInfo,
  CustomToolbar,
} from '@adaptabletools/adaptable-angular-aggrid';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, Module, themeQuartz } from 'ag-grid-enterprise';

import { RECOMMENDED_MODULES } from './agGridModules';
import { columnDefs, defaultColDef } from './columnDefs';
import { rowData } from './rowData';

/**
 * When true, columnHeader prefers layout-specific headers.
 * When false, it falls back to the original headerName from columnDefs.
 */
let useLayoutHeaders = true;

const LayoutHeadersToggleToolbar: CustomToolbar = {
  name: 'LayoutHeadersToggle',
  title: 'Headers',
  toolbarButtons: [
    {
      label: () => (useLayoutHeaders ? 'Using Layout Headers' : 'Using ColumnDef Headers'),
      buttonStyle: () => ({
        variant: 'raised',
        tone: useLayoutHeaders ? 'success' : 'neutral',
      }),
      onClick: (_button, context) => {
        useLayoutHeaders = !useLayoutHeaders;
        // Notify AG Grid to re-evaluate the header values
        context.adaptableApi.agGridApi.refreshHeader();
        // (Optional) Autosize all columns to fit the new header values
        context.adaptableApi.columnApi.autosizeAllColumns();
        // (Just for this demo) Refresh the dashboard to update the toolbar button label / style
        context.adaptableApi.dashboardApi.refreshDashboard();
      },
    },
  ],
};

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
    adaptableId: 'Layout Headers Toggle',
    columnOptions: {
      // @ts-ignore - this is a feature flag, until it is released in the next major version
      alwaysCallHeaderFunction: true,
      columnHeader: (context) => {
        // defaultHeaderName is the resolved value (layout-specific if defined, else ColDef).
        // colDefHeaderName is always the original Column Definition header.
        return useLayoutHeaders ? context.defaultHeaderName : context.colDefHeaderName;
      },
    },
    dashboardOptions: {
      customToolbars: [LayoutHeadersToggleToolbar],
    },
    // Typically you will store State remotely; here we simply leverage local storage for convenience
    initialState: {
      Dashboard: {
        Tabs: [
          {
            Name: 'Default',
            Toolbars: ['Layout', 'LayoutHeadersToggle'],
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
            ColumnHeaders: {
              name: 'Layout: Name',
              language: 'Layout: Language',
              github_stars: 'Layout: GitHub Stars',
              license: 'Layout: License',
            },
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
