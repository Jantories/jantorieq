#version 300 es
precision mediump float;
precision highp int;

uniform highp vec4 u_composite_1;
uniform highp vec2 u_circle1;
uniform highp vec2 u_rotation1;
uniform highp vec2 u_circle2;
uniform highp vec2 u_rotation2;
uniform highp vec2 u_circle3;
uniform highp vec2 u_rotation3;
uniform highp vec2 u_resolution_scale;
uniform highp vec2 u_noise_scale;
uniform highp float u_max_radius;
uniform highp vec2 u_center;
uniform highp float u_noise_phase;
uniform highp vec4 u_color;

in highp vec2 _fragCoord;
layout(location = 0) out highp vec4 fragColor;

void main()
{
    highp vec2 _366 = _fragCoord * u_resolution_scale;
    highp float _378 = u_max_radius * u_composite_1.w;
    highp vec2 _474 = _366 * vec2(0.800000011920928955078125);
    highp float _568 = 1.0 - smoothstep(-0.7265625, 2.7265625, distance(mod((mat2(vec2(u_rotation1.x, -u_rotation1.y), vec2(u_rotation1.yx)) * (u_circle1 - _474)) + u_circle1, vec2(0.17000000178813934326171875)) * vec2(1.25), vec2(0.10625000298023223876953125)) * 14.47963809967041015625);
    highp float _386 = 0.0500000007450580596923828125 * u_max_radius;
    highp float _743 = u_composite_1.z * 0.5;
    highp float _746 = distance(_fragCoord, u_center);
    highp float _748 = 1.0 - _743;
    highp float _750 = 1.0 + _743;
    highp vec2 _830 = fract((_366 - mod(_fragCoord, u_noise_scale)) * vec2(5.398700237274169921875, 5.442100048065185546875));
    highp vec2 _838 = _830 + vec2(dot(_830.yx, _830 + vec2(21.5351009368896484375, 14.3136997222900390625)));
    highp float _843 = _838.x * _838.y;
    highp float _851 = (fract(_843 * 95.43070220947265625) + fract(_843 * 75.0496063232421875)) - 1.0;
    highp float _800 = _851 + sin(3.1415927410125732421875 * (u_noise_phase + 0.3499999940395355224609375));
    highp float _809 = _851 + sin(3.1415927410125732421875 * (u_noise_phase + 0.699999988079071044921875));
    highp float _818 = _851 + sin(3.1415927410125732421875 * (u_noise_phase + 1.0499999523162841796875));
    highp float _409 = (((clamp((((step(0.0, _851) * (1.0 - step(0.0500000007450580596923828125, _851))) + (step(0.100000001490116119384765625, _800) * (1.0 - step(0.1500000059604644775390625, _800)))) + (step(0.20000000298023223876953125, _809) * (1.0 - step(0.25, _809)))) + (step(0.300000011920928955078125, _818) * (1.0 - step(0.3499999940395355224609375, _818))), 0.0, 1.0) * 0.550000011920928955078125) * clamp((1.0 - smoothstep(_748, _750, _746 / (_378 + _386))) - (1.0 - smoothstep(_748, _750, _746 / max(_378 - _386, 0.0))), 0.0, 1.0)) * clamp(0.449999988079071044921875 + ((((_568 * _568) + (1.0 - smoothstep(-1.03125, 3.03125, distance(mod((mat2(vec2(u_rotation2.x, -u_rotation2.y), vec2(u_rotation2.yx)) * (u_circle2 - _474)) + u_circle2, vec2(0.20000000298023223876953125)) * vec2(1.25), vec2(0.125)) * 12.30769252777099609375))) - (1.0 - smoothstep(-1.7929685115814208984375, 3.7929685115814208984375, distance(mod((mat2(vec2(u_rotation3.x, -u_rotation3.y), vec2(u_rotation3.yx)) * (u_circle3 - _474)) + u_circle3, vec2(0.2750000059604644775390625)) * vec2(1.25), vec2(0.171875)) * 8.9510498046875))) * 0.4000000059604644775390625), 0.0, 1.0)) * u_composite_1.y;
    highp float _425 = ((1.0 - smoothstep(_748, _750, _746 / _378)) * u_composite_1.x) * u_color.w;
    fragColor = mix(vec4(u_color.xyz * _425, _425), vec4(1.0), vec4(_409));
}

