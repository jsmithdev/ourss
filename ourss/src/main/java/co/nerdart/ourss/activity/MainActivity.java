/**
 * FeedEx
 *
 * Copyright (c) 2012-2013 Frederic Julian
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package co.nerdart.ourss.activity;

import android.app.ActionBar;
import android.app.FragmentTransaction;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.database.Cursor;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.CursorLoader;
import android.support.v4.content.Loader;
import android.support.v4.view.ViewPager;
import android.view.ActionMode;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import java.lang.reflect.Method;
import java.util.Locale;
import java.util.Random;

import co.nerdart.ourss.Constants;
import co.nerdart.ourss.MainApplication;
import co.nerdart.ourss.PrefUtils;
import co.nerdart.ourss.UiUtils;
import co.nerdart.ourss.fragment.EntriesListFragment;
import co.nerdart.ourss.fragment.FeedsListFragment;
import co.nerdart.ourss.provider.FeedData.EntryColumns;
import co.nerdart.ourss.service.FetcherService;
import co.nerdart.ourss.service.RefreshService;

import static co.nerdart.ourss.R.id;
import static co.nerdart.ourss.R.layout.activity_main;
import static co.nerdart.ourss.R.string;

public class MainActivity extends ProgressFragmentActivity implements ActionBar.TabListener, LoaderManager.LoaderCallbacks<Cursor> {

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    private ViewPager mViewPager;

    private ActionMode mActionMode;

    static NotificationManager mNotificationManager = (NotificationManager) MainApplication.getAppContext().getSystemService(
            Context.NOTIFICATION_SERVICE);


    private final BroadcastReceiver mRefreshReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            getProgressBar().setVisibility(View.VISIBLE);
        }
    };

    private final BroadcastReceiver mRefreshFinishedReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            getProgressBar().setVisibility(View.GONE);
        }
    };

    private final int loaderId = new Random().nextInt();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        UiUtils.setPreferenceTheme(this);
        super.onCreate(savedInstanceState);

        setContentView(activity_main);

        // Set up the action bar.
        final ActionBar actionBar = getActionBar();
        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);

        // Hack to always show the tabs under the actionbar
        try {
            Method setHasEmbeddedTabsMethod = actionBar.getClass().getDeclaredMethod("setHasEmbeddedTabs", boolean.class);
            setHasEmbeddedTabsMethod.setAccessible(true);
            setHasEmbeddedTabsMethod.invoke(actionBar, false);
        } catch (Exception ignored) {
        }

        // Create the adapter that will return a fragment for each of the three
        // primary sections of the app.
        /*
         * The {@link android.support.v4.view.PagerAdapter} that will provide fragments for each of the sections. We use a {@link
		 * android.support.v4.app.FragmentPagerAdapter} derivative, which will keep every loaded fragment in memory. If this becomes too memory
		 * intensive, it may be best to switch to a {@link android.support.v4.app.FragmentStatePagerAdapter}.
		 */
        SectionsPagerAdapter sectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(id.pager);
        mViewPager.setAdapter(sectionsPagerAdapter);

        // When swiping between different sections, select the corresponding
        // tab. We can also use ActionBar.Tab#select() to do this if we have
        // a reference to the Tab.
        mViewPager.setOnPageChangeListener(new ViewPager.SimpleOnPageChangeListener() {
            @Override
            public void onPageSelected(int position) {
                actionBar.setSelectedNavigationItem(position);
                invalidateOptionsMenu(); // Do not do it into onTabSelected()!
            }
        });

        // For each of the sections in the app, add a tab to the action bar.
        for (int i = 0; i < sectionsPagerAdapter.getCount(); i++) {
            // Create a tab with text corresponding to the page title defined by
            // the adapter. Also specify this Activity object, which implements
            // the TabListener interface, as the callback (listener) for when
            // this tab is selected.
            actionBar.addTab(actionBar.newTab().setText(sectionsPagerAdapter.getPageTitle(i)).setTabListener(this));
        }

        if (PrefUtils.getBoolean(PrefUtils.REFRESH_ENABLED, true)) {
            // starts the service independent to this activity
            startService(new Intent(this, RefreshService.class));
        } else {
            stopService(new Intent(this, RefreshService.class));
        }
        if (PrefUtils.getBoolean(PrefUtils.REFRESH_ON_OPEN_ENABLED, false)) {
            if (!FetcherService.isRefreshingFeeds) {
                startService(new Intent(MainActivity.this, FetcherService.class).setAction(Constants.ACTION_REFRESH_FEEDS));
            }
        }

        getSupportLoaderManager().initLoader(loaderId, null, this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        getProgressBar().setVisibility(FetcherService.isRefreshingFeeds ? View.VISIBLE : View.GONE);
        registerReceiver(mRefreshReceiver, new IntentFilter(Constants.ACTION_REFRESH_FEEDS));
        registerReceiver(mRefreshFinishedReceiver, new IntentFilter(Constants.ACTION_REFRESH_FINISHED));

        if (mNotificationManager != null) {
            mNotificationManager.cancel(0);
        }
    }

    @Override
    protected void onPause() {
        if (mActionMode != null) {
            mActionMode.finish();
        }

        unregisterReceiver(mRefreshReceiver);
        unregisterReceiver(mRefreshFinishedReceiver);
        super.onPause();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // HACK to get the good fragment...
        getSupportFragmentManager().findFragmentByTag("android:switcher:" + id.pager + ":" + getActionBar().getSelectedNavigationIndex())
                .onCreateOptionsMenu(menu, getMenuInflater());
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // HACK to get the good fragment...
        getSupportFragmentManager().findFragmentByTag("android:switcher:" + id.pager + ":" + getActionBar().getSelectedNavigationIndex())
                .onOptionsItemSelected(item);
        return true;
    }

    @Override
    public void onActionModeFinished(ActionMode mode) {
        mActionMode = null;
        super.onActionModeFinished(mode);
    }

    @Override
    public void onActionModeStarted(ActionMode mode) {
        mActionMode = mode;
        super.onActionModeStarted(mode);
    }

    @Override
    public void onTabSelected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {
        // When the given tab is selected, switch to the corresponding page in the ViewPager.
        mViewPager.setCurrentItem(tab.getPosition());

        if (mActionMode != null) {
            mActionMode.finish();
        }
    }

    @Override
    public void onTabUnselected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {
    }

    @Override
    public void onTabReselected(ActionBar.Tab tab, FragmentTransaction fragmentTransaction) {
    }

    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to one of the sections/tabs/pages.
     */
    private static class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            Fragment fragment = null;
            Bundle args = new Bundle();
            switch (position) {
                case 0:
                    fragment = new FeedsListFragment();
                    break;
                case 1:
                    fragment = new EntriesListFragment();
                    args.putParcelable(EntriesListFragment.ARG_URI, EntryColumns.CONTENT_URI);
                    args.putBoolean(EntriesListFragment.ARG_SHOW_FEED_INFO, true);
                    fragment.setArguments(args);
                    break;
                case 2:
                    fragment = new EntriesListFragment();
                    args.putParcelable(EntriesListFragment.ARG_URI, EntryColumns.FAVORITES_CONTENT_URI);
                    args.putBoolean(EntriesListFragment.ARG_SHOW_FEED_INFO, true);
                    fragment.setArguments(args);
                    break;
                case 3:
                    fragment = new Fragment();
                    break;

                default:
                    break;
            }

            return fragment;
        }

        @Override
        public int getCount() {
            // Show 4 total pages.
            return 4;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            switch (position) {
                case 0:
                    return MainApplication.getAppContext().getString(string.overview).toUpperCase(Locale.getDefault());
                case 1: {
                    return MainApplication.getAppContext().getString(string.all).toUpperCase(Locale.getDefault());
                }
                case 2:
                    return MainApplication.getAppContext().getString(string.favorites).toUpperCase(Locale.getDefault());

                case 3:
                    return MainApplication.getAppContext().getString(string.audio).toUpperCase
                            (Locale.getDefault());
            }
            return null;
        }
    }

    @Override
    public Loader<Cursor> onCreateLoader(int id, Bundle args) {
        CursorLoader cursorLoader = new CursorLoader(this, EntryColumns.CONTENT_URI, new String[]{"COUNT(*)"}, EntryColumns.WHERE_UNREAD, null,
                null);
        cursorLoader.setUpdateThrottle(Constants.UPDATE_THROTTLE_DELAY);
        return cursorLoader;
    }

    @Override
    public void onLoadFinished(Loader<Cursor> loader, Cursor data) {
        if (data.moveToFirst()) {
            int nbUnread = data.getInt(0);
            if (nbUnread > 0)
                getActionBar().getTabAt(1).setText(getString(string.all).toUpperCase(Locale.getDefault()) + " (" + data.getInt(0) + ')');
            else
                getActionBar().getTabAt(1).setText(getString(string.all).toUpperCase(Locale.getDefault()));
        }
    }

    @Override
    public void onLoaderReset(Loader<Cursor> loader) {
    }
}
