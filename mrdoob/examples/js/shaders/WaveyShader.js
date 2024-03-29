/**
 * @author alteredq / http://alteredqualia.com/
 *
 * Film grain & scanlines shader
 *
 * - ported from HLSL to WebGL / GLSL
 * http://www.truevision3d.com/forums/showcase/staticnoise_colorblackwhite_scanline_shaders-t18698.0.html
 *
 * Screen Space Static Postprocessor
 *
 * Produces an analogue noise overlay similar to a film grain / TV static
 *
 * Original implementation and noise algorithm
 * Pat 'Hawthorne' Shearon
 *
 * Optimized scanlines + noise version with intensity scaling
 * Georg 'Leviathan' Steinrohder
 *
 * This version is provided under a Creative Commons Attribution 3.0 License
 * http://creativecommons.org/licenses/by/3.0/
 */

THREE.WaveyShader = {

	uniforms: {
		"timer": {type: "f", value: null},
		"tDiffuse":   { type: "t", value: null }
	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join("\n"),

	fragmentShader: [

		"uniform float timer;",
		"uniform sampler2D tDiffuse; //rendered scene sampler",

		"varying vec2 vUv;",

		"void main() ",
		"{",
		"	float offset = sin(timer + vUv.y)",
		"	vec2 texCoord = vec2(vUv.x + offset, vUv.y);",

		"	vec3 col = texture2D(tDiffuse, texCoord).rgb;",

		"	gl_FragColor =  vec4(col,1.0);",
		"}",

	].join("\n")

};
