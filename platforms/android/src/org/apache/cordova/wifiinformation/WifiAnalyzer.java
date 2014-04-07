package org.apache.cordova.wifiinformation;

import java.util.List;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import android.content.Context;
import android.net.wifi.ScanResult;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

public class WifiAnalyzer extends CordovaPlugin {

	private WifiManager wifiManager;
	private WifiManager.WifiLock wifiLock;

	@Override 
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
		Context context = cordova.getActivity().getApplicationContext();
		this.wifiManager = (WifiManager) context.getSystemService(Context.WIFI_SERVICE);
		if (!this.wifiManager.isWifiEnabled()) {
			this.wifiManager.setWifiEnabled(true);
			this.wifiLock = this.wifiManager.createWifiLock(WifiManager.WIFI_MODE_FULL, "WifiAnalyzer");
			this.wifiLock.acquire();
		}
	}

	@Override 
	public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {
		this.wifiManager.startScan();
		JSONObject response = new JSONObject();
		JSONObject active = this.getActiveNetwork(callbackContext);
		if (active != null) {
			response.put("active", active);
		}
		JSONArray available = this.getAvailableNetwork(callbackContext);
		if (available != null) {
			response.put("available", available);
		}
		callbackContext.success(response);
		return true;
	}

	private JSONObject getActiveNetwork(CallbackContext callbackContext) {
		WifiInfo wifiInfo = this.wifiManager.getConnectionInfo();
		if (wifiInfo.getSSID() == null || wifiInfo.getIpAddress() == 0) {
			return null;
		}
		try {
			JSONObject active = new JSONObject();
			active.put("BSSID", wifiInfo.getBSSID());
			active.put("HiddenSSID", wifiInfo.getHiddenSSID());
			active.put("SSID", wifiInfo.getSSID());
			active.put("MacAddress", wifiInfo.getMacAddress());
			active.put("IpAddress", wifiInfo.getIpAddress());
			active.put("NetworkId", wifiInfo.getNetworkId());
			active.put("RSSI", wifiInfo.getRssi());
			active.put("LinkSpeed", wifiInfo.getLinkSpeed());
			return active;
		} catch (JSONException e) {
			e.printStackTrace();
			callbackContext.error("JSON Exception");
		}
		return null;
	}

	private JSONArray getAvailableNetwork(CallbackContext callbackContext) {
		List<ScanResult> scanResults = this.wifiManager.getScanResults();
		if (scanResults.isEmpty()) {
			return null;
		}
		try {
			JSONArray available = new JSONArray();
			for (ScanResult scanResult : scanResults) {
				JSONObject accessPoint = new JSONObject();
				accessPoint.put("BSSID", scanResult.BSSID);
				accessPoint.put("SSID", scanResult.SSID);
				accessPoint.put("frequency", scanResult.frequency);
				accessPoint.put("level", scanResult.level);
				accessPoint.put("capabilities", scanResult.capabilities);
				available.put(accessPoint);
			}
			return available;
		} catch (JSONException e) {
			e.printStackTrace();
			callbackContext.error("JSON Exception");
		}
		return null;
	}

	public void onDestroy() {
		this.wifiLock.release();
	}

}
