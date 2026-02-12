import { BaseButton } from "SpectaclesUIKit.lspkg/Scripts/Components/Button/BaseButton";

@component
export class PanelNavigator extends BaseScriptComponent {
  @input
  spawnShapePanel: SceneObject | undefined;

  @input
  changeSizePanel: SceneObject | undefined;

  @input
  changeColorPanel: SceneObject | undefined;

  @input
  nextButton: BaseButton | undefined;

  @input
  nextButton2: BaseButton | undefined;

  @input
   colorPickerController: any

  onAwake() {
    this.createEvent("OnStartEvent").bind(() => {
      this.onStart();
    });
  }

  onStart() {
    print("=== PanelNavigator Starting ===");
    print("spawnShapePanel assigned: " + (this.spawnShapePanel !== undefined));
    print("changeSizePanel assigned: " + (this.changeSizePanel !== undefined));
    print("changeColorPanel assigned: " + (this.changeColorPanel !== undefined));
    
    // Hide all panels first
    this.hideAllPanels();
    
    // Then show only the first panel
    if (this.spawnShapePanel) {
      this.spawnShapePanel.enabled = true;
      print("SpawnShapePanel is now visible");
    }

    // Setup first next button to switch to ChangeSizePanel
    if (this.nextButton) {
      print("NextButton 1 connected");
      this.nextButton.onTriggerUp.add(() => {
        print("NextButton 1 pressed - switching to ChangeSizePanel");
        this.switchToChangeSizePanel();
      });
    } else {
      print("WARNING: NextButton 1 is not assigned!");
    }

    // Setup second next button to switch to ChangeColorPanel
    if (this.nextButton2) {
      print("NextButton 2 connected");
      this.nextButton2.onTriggerUp.add(() => {
        print("NextButton 2 pressed - switching to ChangeColorPanell");
        this.switchToChangeColorPanel();
      });
    } else {
      print("WARNING: NextButton 2 is not assigned!");
    }
  }

  hideAllPanels() {
    print("hideAllPanels called");
    if (this.spawnShapePanel) {
      this.spawnShapePanel.enabled = false;
      print("  - spawnShapePanel disabled");
    }
    if (this.changeSizePanel) {
      this.changeSizePanel.enabled = false;
      print("  - changeSizePanel disabled");
    }
    if (this.changeColorPanel) {
      this.changeColorPanel.enabled = false;
      print("  - changeColorPanel disabled");
    }
  }

  switchToChangeSizePanel() {
    print("Switching to ChangeSizePanel...");
    this.hideAllPanels();
    
    if (this.changeSizePanel) {
      this.changeSizePanel.enabled = true;
      print("ChangeSizePanel enabled: " + this.changeSizePanel.enabled);
    } else {
      print("ERROR: changeSizePanel is undefined!");
    }
  }

  switchToChangeColorPanel() {
    print("Switching to ChangeColorPanel...");

    if (this.colorPickerController) {
      this.colorPickerController.applyColor();
    }

    this.hideAllPanels();
    
    if (this.changeColorPanel) {
      this.changeColorPanel.enabled = true;
      print("ChangeColorPanel enabled: " + this.changeColorPanel.enabled);
      print("ChangeColorPanel name: " + this.changeColorPanel.name);
    } else {
      print("ERROR: ChangeColorPanel is undefined!");
    }
  }
}