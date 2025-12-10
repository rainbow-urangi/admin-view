import { useEffect, useState } from "react";
import api from "../api/axios";
import DataTable from "../components/DataTable";

export default function AZEventsList() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/az-events").then((res) => setRows(res.data));
  }, []);

  const columns = [
    { key: "id", label: "ID" },
    { key: "AZ_api_url", label: "API URL" },
    { key: "AZ_api_method", label: "API Method" },
    { key: "AZ_api_status", label: "API Status" },
    { key: "AZ_api_path", label: "API Path" },
    { key: "AZ_ip_address", label: "IP Address" },
    { key: "AZ_url", label: "URL" },
    { key: "AZ_login_id", label: "Login ID" },
    { key: "AZ_event_time", label: "Event Time" },
    { key: "AZ_element_uid", label: "Element UID" },
    { key: "AZ_element_type", label: "Element Type" },
    { key: "AZ_element_label", label: "Element Label" },
    { key: "AZ_data", label: "Data" },
    { key: "AZ_frame_path", label: "Frame Path" },
    { key: "AZ_shadow_path", label: "Shadow Path" },
    { key: "AZ_form_selector", label: "Form Selector" },
    { key: "AZ_locators_json", label: "Locators JSON" },
    { key: "AZ_nav_root", label: "Nav Root" },
    { key: "AZ_menu_li_trail", label: "Menu LI Trail" },
    { key: "AZ_post_hints", label: "Post Hints" },
    { key: "AZ_event_action", label: "Event Action" },
    { key: "AZ_event_subtype", label: "Event Subtype" },
    { key: "AZ_page_title", label: "Page Title" },
    { key: "AZ_referrer", label: "Referrer" },
    { key: "AZ_viewport_w", label: "Viewport W" },
    { key: "AZ_viewport_h", label: "Viewport H" },
    { key: "AZ_url_host", label: "URL Host" },
    { key: "AZ_url_path", label: "URL Path" },
    { key: "AZ_api_host", label: "API Host" },
    { key: "AZ_api_latency_ms", label: "API Latency (ms)" },
    { key: "AZ_session_install_id", label: "Session Install ID" },
    { key: "AZ_session_browser_id", label: "Session Browser ID" },
    { key: "AZ_session_tab_id", label: "Session Tab ID" },
    { key: "AZ_session_page_id", label: "Session Page ID" },
    { key: "AZ_selector_css", label: "Selector CSS" },
    { key: "AZ_selector_xpath", label: "Selector XPATH" },
    { key: "AZ_element_tag", label: "Element Tag" },
    { key: "AZ_a11y_role", label: "A11Y Role" },
    { key: "AZ_aria_label", label: "ARIA Label" },
    { key: "AZ_aria_labelledby", label: "ARIA LabelledBy" },
    { key: "AZ_form_name", label: "Form Name" },
    { key: "AZ_form_action", label: "Form Action" },
    { key: "AZ_data_testid", label: "Test ID" },
    { key: "AZ_input_length", label: "Input Length" },
    { key: "AZ_is_sensitive", label: "Sensitive" },
    { key: "AZ_key", label: "Key" },
    { key: "AZ_key_mods", label: "Key Mods" },
    { key: "AZ_menu_section", label: "Menu Section" },
    { key: "AZ_menu_item", label: "Menu Item" },
    { key: "AZ_route_from", label: "Route From" },
    { key: "AZ_route_to", label: "Route To" }
    ];

  return (
    <div className="container mt-4">
      <h3>AZ Events</h3>
      <DataTable columns={columns} data={rows} />
    </div>
  );
}
