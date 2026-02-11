@component
export class SliderScaleController extends BaseScriptComponent {
    @input
    slider: any;
    
    @input
    minScale: number = 1;
    
    @input
    maxScale: number = 10;
    
    private currentMesh: SceneObject = null;
    private baseScale: vec3;
    
    onAwake() {
        const delayedEvent = this.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(() => {
            if (this.slider && this.slider.onValueChange) {
                this.slider.onValueChange.add((value: number) => {
                    this.updateScale(value);
                });
                
                // Start at minimum scale (slider at 0)
                if (this.slider.currentValue !== 0) {
                    this.slider.updateCurrentValue(0);
                }
            }
        });
        delayedEvent.reset(0.1);
    }
    
    setActiveMesh(mesh: SceneObject) {
        print("Setting active mesh: " + mesh.name);
        this.currentMesh = mesh;
        if (this.currentMesh) {
            this.baseScale = this.currentMesh.getTransform().getLocalScale();
            // Reset to minimum scale when new mesh is selected
            this.updateScale(0);
            if (this.slider) {
                this.slider.updateCurrentValue(0);
            }
        }
    }
    
    updateScale(sliderValue: number) {
        if (!this.currentMesh) {
            print("No current mesh to scale");
            return;
        }
        
        const scaleMultiplier = this.minScale + (this.maxScale - this.minScale) * sliderValue;
        const newScale = this.baseScale.uniformScale(scaleMultiplier);
        
        this.currentMesh.getTransform().setLocalScale(newScale);
        print("Scale updated to: " + scaleMultiplier);
    }
}