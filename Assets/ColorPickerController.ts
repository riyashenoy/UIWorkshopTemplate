import { SpawnShape } from "SpawnShape";

@component
export class ColorPickerController extends BaseScriptComponent {
    @input
    @hint("The Sample Color Indicator object that shows the selected color")
    sampleColorIndicator: SceneObject;
    
    @input
    spawnShape: SpawnShape;
    
    @input
    @hint("Update color continuously (real-time) or only on demand")
    continuousUpdate: boolean = true;
    
    private updateEvent: SceneEvent;
    private lastColor: vec4 = new vec4(0, 0, 0, 0);
    
    onAwake() {
        print("=== ColorPickerController: onAwake called ===");
        this.createEvent("OnStartEvent").bind(() => {
            this.initialize();
        });
    }
    
    initialize() {
        print("=== ColorPickerController: initialize called ===");
        print("ColorPickerController: continuousUpdate = " + this.continuousUpdate);
        
        if (!this.sampleColorIndicator) {
            print("ColorPickerController: ERROR - Sample Color Indicator NOT ASSIGNED!");
            return;
        }
        print("ColorPickerController: Sample Color Indicator assigned: " + this.sampleColorIndicator.name);
        
        if (!this.spawnShape) {
            print("ColorPickerController: ERROR - SpawnShape NOT ASSIGNED!");
            return;
        }
        print("ColorPickerController: SpawnShape assigned");
        
        if (this.continuousUpdate) {
            print("ColorPickerController: Setting up continuous update");
            this.updateEvent = this.createEvent("UpdateEvent");
            this.updateEvent.bind(() => {
                this.updateColorIfChanged();
            });
            print("ColorPickerController: Update event bound successfully");
        } else {
            print("ColorPickerController: Continuous update is OFF");
        }
        
        print("=== ColorPickerController: Initialized ===");
    }
    
    private updateColorIfChanged() {
        const color = this.getSelectedColor();
        if (!color) {
            return;
        }
        
        // Only update if color changed
        if (!this.colorsEqual(color, this.lastColor)) {
            print("ColorPickerController: Color changed! RGBA(" + 
                  color.x.toFixed(2) + ", " + 
                  color.y.toFixed(2) + ", " + 
                  color.z.toFixed(2) + ", " + 
                  color.w.toFixed(2) + ")");
            this.spawnShape.setColor(color);
            this.lastColor = color;
        }
    }
    
    private colorsEqual(c1: vec4, c2: vec4): boolean {
        const epsilon = 0.01;
        return Math.abs(c1.x - c2.x) < epsilon &&
               Math.abs(c1.y - c2.y) < epsilon &&
               Math.abs(c1.z - c2.z) < epsilon &&
               Math.abs(c1.w - c2.w) < epsilon;
    }
    
    private getSelectedColor(): vec4 | null {
        const renderMesh = this.sampleColorIndicator.getComponent(
            "Component.RenderMeshVisual"
        ) as RenderMeshVisual;
        
        if (!renderMesh) {
            print("ColorPickerController: No RenderMeshVisual!");
            return null;
        }
        
        const mainPass = renderMesh.mainPass;
        if (!mainPass) {
            print("ColorPickerController: No mainPass!");
            return null;
        }
        
        if (mainPass.mainColor) {
            return mainPass.mainColor;
        }
        
        print("ColorPickerController: No mainColor found!");
        return null;
    }
    
    public applyColor() {
        print("ColorPickerController: applyColor() called");
        const color = this.getSelectedColor();
        if (color) {
            this.spawnShape.setColor(color);
            this.lastColor = color;
        }
    }
}