#version 300 es
precision highp float;

uniform vec2 u_size;

in vec2 a_position;
out highp vec2 _fragCoord;

void main()
{
    // Pixel coordinates with the origin at the top-left, matching the fragment shader's expectations.
    vec2 uv = a_position * 0.5 + 0.5;
    _fragCoord = vec2(uv.x, 1.0 - uv.y) * u_size;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
