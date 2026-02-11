import { BaseButton } from "SpectaclesUIKit.lspkg/Scripts/Components/Button/BaseButton";

@component
export class PanelNavigator extends BaseScriptComponent {
  @input
  spawnShapePanel: SceneObject | undefined;

  @input
  changeSizePanel: SceneObject | undefined;

  @input
  thirdPanel: SceneObject | undefined;

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
    print("thirdPanel assigned: " + (this.thirdPanel !== undefined));
    
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

    // Setup second next button to switch to ThirdPanel
    if (this.nextButton2) {
      print("NextButton 2 connected");
      this.nextButton2.onTriggerUp.add(() => {
        print("NextButton 2 pressed - switching to ThirdPanel");
        this.switchToThirdPanel();
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
    if (this.thirdPanel) {
      this.thirdPanel.enabled = false;
      print("  - thirdPanel disabled");
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

  switchToThirdPanel() {
    print("Switching to ThirdPanel...");

    if (this.colorPickerController) {
      this.colorPickerController.applyColor();
    }

    this.hideAllPanels();
    
    if (this.thirdPanel) {
      this.thirdPanel.enabled = true;
      print("ThirdPanel enabled: " + this.thirdPanel.enabled);
      print("ThirdPanel name: " + this.thirdPanel.name);
    } else {
      print("ERROR: ThirdPanel is undefined!");
    }
  }
}