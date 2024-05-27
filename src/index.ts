import { Plugin, showMessage, fetchSyncPost } from "siyuan"
import "@/index.scss";

export default class PluginSample extends Plugin {


  private blockIconEventBindThis = this.blockIconEvent.bind(this);

  async onload() {
    console.log("Load Plugin Text Box");

    this.addIcons(`<svg id="iconTextArea" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-textarea-t" viewBox="0 0 16 16">
  <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
  <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386z"/>
</svg>`)
    this.addIcons(`<svg id="iconBackToNormal" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
  <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
</svg>`)

    const topBarElement = this.addTopBar({
      icon : "iconFace",
      title: "TopBar button",
      position: "right",
      callback: () => {
        showMessage("click Top Bar Button");
      }
    });

    this.eventBus.on("click-blockicon", this.blockIconEventBindThis);

    console.log("Succeed!")
  }

  async onunload() {
    console.log("Unload Plugin Text Box")
  }

  uninstall() {
    console.log("Uninstall Plugin Text Box, Good Bye~")
  }

  async setupTextBoxAttr(blockId, value) {
    let url = "/api/attr/setBlockAttrs";
    let attrs_data = { "custom-plugin-textbox": value};
    let post_data = { id: blockId, attrs:attrs_data };
    let response = await fetchSyncPost(url, post_data);
    let res = response.code === 0 ? response.data : null;
  }

  private blockIconEvent({ detail }: any) {
    let subMenus = [
      {
        icon: "iconTextArea",
        label: "TextBox",
        click: () => {
          let ele = detail.blockElements[0];
          let nodeId = ele.getAttribute("data-node-id");
          this.setupTextBoxAttr(nodeId, "textbox");
        }
      },
      {
        type: "separator"
      },
      {
        icon: "iconBackToNormal",
        label: "Eleminate",
        click: () => {
          let ele = detail.blockElements[0];
          let nodeId = ele.getAttribute("data-node-id");
          this.setupTextBoxAttr(nodeId, "");
        }
      },
    ];
    detail.menu.addItem ({
      icon: "iconTextArea",
      label: "TextBox",
      type: "submenu",
      submenu: subMenus
    });
  }
}
