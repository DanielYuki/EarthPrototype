uniform sampler2D uTexture;

varying vec2 vertexUV;
varying vec3 vertexNormal;

void main(){
    float intensity = 1.005 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);

    // csm_DiffuseColor = vec4(atmosphere + texture2D(uTexture, vertexUV).xyz, 1.0);
    gl_FragColor = vec4(atmosphere + texture2D(uTexture, vertexUV).xyz, 1.0);
}