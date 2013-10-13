package co.nerdart.ourss.fragment;

import android.app.ListFragment;
import android.app.LoaderManager;
import android.content.Intent;
import android.content.Loader;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import java.util.Random;

import co.nerdart.ourss.Constants;
import co.nerdart.ourss.PrefUtils;
import co.nerdart.ourss.R;
import co.nerdart.ourss.activity.GeneralPrefsActivity;
import co.nerdart.ourss.service.FetcherService;

/**
 * Created by Jamie on 10/13/13.
 */
public class PlayerFragment extends ListFragment implements LoaderManager.LoaderCallbacks<Cursor>


{

    final int loaderId = new Random().nextInt();

    final SharedPreferences.OnSharedPreferenceChangeListener prefListener = new SharedPreferences.OnSharedPreferenceChangeListener() {
        @Override
        public void onSharedPreferenceChanged(SharedPreferences sharedPreferences, String key) {
            if (PrefUtils.SHOW_READ.equals(key)) {
                getLoaderManager().restartLoader(loaderId, null, PlayerFragment.this);
            }
        }
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public Loader<Cursor> onCreateLoader(int id, Bundle args) {
        return null;
    }

    @Override
    public void onLoadFinished(Loader<Cursor> loader, Cursor data) {

    }

    @Override
    public void onLoaderReset(Loader<Cursor> loader) {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.player_fragment, container, false);

        return rootView;
    }


    @Override
    public void onDestroy() {
        PrefUtils.unregisterOnSharedPreferenceChangeListener(prefListener);
        super.onStop();
    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        inflater.inflate(R.menu.entry_list, menu);
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {

            case R.id.menu_refresh: {
                if (!FetcherService.isRefreshingFeeds) {
                    getActivity().startService(new Intent(getActivity(), FetcherService.class).setAction(Constants.ACTION_REFRESH_FEEDS));
                }
                return true;
            }
            case R.id.menu_settings: {
                startActivity(new Intent(getActivity(), GeneralPrefsActivity.class));
                return true;
            }
        }
        return super.onOptionsItemSelected(item);
    }

}