package co.nerdart.ourss.activity;

import android.app.Activity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import co.nerdart.ourss.R;

public abstract class ProgressActivity extends Activity {
    private ProgressBar mProgressBar;

    @Override
    public void setContentView(View view) {
        init().addView(view);
    }

    @Override
    public void setContentView(int layoutResID) {
        getLayoutInflater().inflate(layoutResID, init(), true);
    }

    @Override
    public void setContentView(View view, ViewGroup.LayoutParams params) {
        init().addView(view, params);
    }

    private ViewGroup init() {
        super.setContentView(R.layout.progress_activity);
        mProgressBar = (ProgressBar) findViewById(R.id.activity_bar);
        return (ViewGroup) findViewById(R.id.activity_frame);
    }

    protected ProgressBar getProgressBar() {
        return mProgressBar;
    }
}