@component
export class SpawnShape extends BaseScriptComponent {
    @input
    cylinderMesh: RenderMeshVisual;
    
    @input
    boxMesh: RenderMeshVisual;
    
    @input
    sphereMesh: RenderMeshVisual;
    
    @input
    cylinderButton: any;
    
    @input
    sphereButton: any;
    
    @input
    cubeButton: any;
    
    @input
    sliderScaleController: any;
    
    private activeMesh: RenderMeshVisual | null = null;
    
    onAwake() {
        this.hideAllMeshes();
        
        const delayedEvent = this.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(() => {
            this.cylinderButton.onValueChange.add((value: number) => {
                if (value === 1) this.showCylinder();
            });
            
            this.sphereButton.onValueChange.add((value: number) => {
                if (value === 1) this.showSphere();
            });
            
            this.cubeButton.onValueChange.add((value: number) => {
                if (value === 1) this.showBox();
            });
        });
        delayedEvent.reset(0.1);
    }
    
    hideAllMeshes() {
        this.cylinderMesh.enabled = false;
        this.boxMesh.enabled = false;
        this.sphereMesh.enabled = false;
    }
    
    showCylinder() {
        this.hideAllMeshes();
        this.cylinderMesh.enabled = true;
        this.activeMesh = this.cylinderMesh;
        this.sliderScaleController.setActiveMesh(this.cylinderMesh.getSceneObject());
    }
    
    showBox() {
        this.hideAllMeshes();
        this.boxMesh.enabled = true;
        this.activeMesh = this.boxMesh;
        this.sliderScaleController.setActiveMesh(this.boxMesh.getSceneObject());
    }
    
    showSphere() {
        this.hideAllMeshes();
        this.sphereMesh.enabled = true;
        this.activeMesh = this.sphereMesh;
        this.sliderScaleController.setActiveMesh(this.sphereMesh.getSceneObject());
    }
    
    /**
     * Apply color to the currently active mesh
     */
public setColor(color: vec4) {
    if (!this.activeMesh) {
        print("SpawnShape: No active mesh to color");
        return;
    }
    
    const mainPass = this.activeMesh.mainPass;
    if (mainPass) {
        // Try both property names since different material types use different names
        if (mainPass.baseColor !== undefined) {
            mainPass.baseColor = color;
            print("SpawnShape: Color applied via baseColor - RGBA(" + 
                  color.x.toFixed(2) + ", " + 
                  color.y.toFixed(2) + ", " + 
                  color.z.toFixed(2) + ", " + 
                  color.w.toFixed(2) + ")");
        } else if (mainPass.mainColor !== undefined) {
            mainPass.mainColor = color;
            print("SpawnShape: Color applied via mainColor - RGBA(" + 
                  color.x.toFixed(2) + ", " + 
                  color.y.toFixed(2) + ", " + 
                  color.z.toFixed(2) + ", " + 
                  color.w.toFixed(2) + ")");
        } else {
            print("SpawnShape: ERROR - No color property found on material!");
        }
    } else {
        print("SpawnShape: No mainPass found on mesh");
    }
}
    /**
     * Get the currently active mesh
     */
    public getActiveMesh(): RenderMeshVisual | null {
        return this.activeMesh;
    }
}