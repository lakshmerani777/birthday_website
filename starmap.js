// ============================================================
// ASTRONOMICALLY ACCURATE STAR MAP
// Sky over Mumbai on March 28, 2007 at 00:00 IST
// ============================================================
(function () {
    'use strict';

    // === OBSERVER CONFIG ===
    var LAT = 19.139136;          // degrees North
    var LON = 72.868067;          // degrees East
    var UTC_OFFSET = 5.5;         // IST = UTC+5:30
    var OBS_YEAR = 2007, OBS_MONTH = 3, OBS_DAY = 28;
    var OBS_HOUR = 0, OBS_MIN = 0; // midnight local

    var DEG = Math.PI / 180;
    var RAD = 180 / Math.PI;

    // === BRIGHT STAR CATALOG (J2000) ===
    // [RA hours, Dec degrees, visual magnitude, name/null]
    var CATALOG = [
        [6.752, -16.716, -1.46, "Sirius"],
        [6.399, -52.696, -0.72, "Canopus"],
        [14.261, 19.182, -0.05, "Arcturus"],
        [18.616, 38.784, 0.03, "Vega"],
        [5.278, 45.998, 0.08, "Capella"],
        [5.242, -8.202, 0.13, "Rigel"],
        [7.655, 5.225, 0.34, "Procyon"],
        [5.919, 7.407, 0.42, "Betelgeuse"],
        [1.629, -57.237, 0.46, "Achernar"],
        [14.064, -60.373, 0.61, "Hadar"],
        [19.846, 8.868, 0.76, "Altair"],
        [12.443, -63.099, 0.77, "Acrux"],
        [4.599, 16.509, 0.85, "Aldebaran"],
        [13.420, -11.161, 0.97, "Spica"],
        [16.490, -26.432, 1.09, "Antares"],
        [7.755, 28.026, 1.14, "Pollux"],
        [22.961, -29.622, 1.16, "Fomalhaut"],
        [20.690, 45.280, 1.25, "Deneb"],
        [12.795, -59.689, 1.25, "Mimosa"],
        [10.140, 11.967, 1.35, "Regulus"],
        [6.977, -28.972, 1.50, "Adhara"],
        [7.577, 31.888, 1.58, "Castor"],
        [12.519, -57.113, 1.63, "Gacrux"],
        [17.560, -37.104, 1.62, "Shaula"],
        [5.419, 6.350, 1.64, "Bellatrix"],
        [5.438, 28.608, 1.65, "Elnath"],
        [5.604, -1.202, 1.69, "Alnilam"],
        [22.137, -46.961, 1.73, "Alnair"],
        [5.679, -1.943, 1.74, "Alnitak"],
        [12.900, 55.960, 1.77, "Alioth"],
        [11.062, 61.751, 1.79, "Dubhe"],
        [3.405, 49.861, 1.79, "Mirfak"],
        [7.140, -26.393, 1.84, "Wezen"],
        [18.402, -34.384, 1.85, "Kaus Australis"],
        [8.376, -59.510, 1.86, "Avior"],
        [13.792, 49.313, 1.86, "Alkaid"],
        [5.992, 44.947, 1.90, "Menkalinan"],
        [16.811, -69.028, 1.92, "Atria"],
        [6.629, 16.399, 1.93, "Alhena"],
        [20.427, -56.735, 1.94, "Peacock"],
        [6.379, -17.956, 1.98, "Mirzam"],
        [9.460, -8.659, 1.98, "Alphard"],
        [2.530, 89.264, 1.98, "Polaris"],
        [2.120, 23.462, 2.00, "Hamal"],
        [0.727, -17.987, 2.04, "Diphda"],
        [13.399, 54.925, 2.06, "Mizar"],
        [18.921, -26.297, 2.05, "Nunki"],
        [14.111, -36.370, 2.06, "Menkent"],
        [5.796, -9.670, 2.09, "Saiph"],
        [0.140, 29.091, 2.07, "Alpheratz"],
        [1.163, 35.621, 2.07, "Mirach"],
        [14.845, 74.156, 2.08, "Kochab"],
        [17.582, 12.560, 2.08, "Rasalhague"],
        [3.136, 40.957, 2.09, "Algol"],
        [11.818, 14.572, 2.14, "Denebola"],
        [15.578, 26.715, 2.22, "Alphecca"],
        [5.533, -0.299, 2.23, "Mintaka"],
        [20.370, 40.257, 2.23, "Sadr"],
        [17.944, 51.489, 2.24, "Eltanin"],
        [0.675, 56.537, 2.24, "Schedar"],
        [8.059, -40.003, 2.25, "Naos"],
        [2.065, 42.330, 2.26, "Almach"],
        [0.153, 59.150, 2.28, "Caph"],
        [11.031, 56.382, 2.37, "Merak"],
        [14.750, 27.074, 2.37, "Izar"],
        [21.736, 9.875, 2.39, "Enif"],
        [11.897, 53.695, 2.44, "Phecda"],
        [23.063, 28.083, 2.42, "Scheat"],
        [23.079, 15.205, 2.49, "Markab"],
        [17.173, -15.725, 2.43, "Sabik"],
        [15.738, 6.426, 2.63, "Unukalhai"],
        [12.934, 38.318, 2.90, "Cor Caroli"],
        [9.764, -65.072, 2.76, "Turais"],
        [12.263, -17.542, 2.83, "Gienah"],
        [12.168, -22.620, 2.94, "Algorab"],
        [17.508, -37.296, 2.70, "Sargas"],
        [12.694, -48.960, 2.17, "Muhlifain"],
        [8.745, -54.709, 2.45, "Aspidiske"],
        [9.133, -43.433, 2.21, "Suhail"],
        [15.283, -9.383, 2.61, "Zubeneschamali"],
        [14.848, -16.042, 2.75, "Zubenelgenubi"],
        [21.310, 62.586, 2.51, "Alderamin"],
        [10.333, 23.417, 2.98, "Zosma"],
        [11.235, 20.524, 2.56, "Algieba"],
        [10.123, 16.763, 3.52, "Eta Leo"],
        [9.879, 26.007, 3.44, "Mu Leo"],
        [10.278, 23.770, 3.34, "Theta Leo"],
        [11.817, 14.572, 2.14, "Beta Leo"],
        [3.038, 4.090, 2.00, "Alpha Cet"],
        [5.268, -5.909, 3.19, "Tau Ori"],
        [5.586, -2.600, 2.77, "Eta Ori"],
        [5.680, -1.201, 3.36, "Sigma Ori"],
        [16.006, -22.622, 2.29, "Dschubba"],
        [16.091, -19.806, 2.56, "Acrab"],
        [16.836, -34.293, 2.89, "Epsilon Sco"],
        [17.202, -43.239, 1.87, "Theta Sco"],
        [6.111, -17.054, 2.93, "Eta CMa"],
        [5.927, 20.276, 3.00, "Zeta Tau"],
        [6.383, 22.514, 3.06, "Eta Gem"],
        [7.069, 20.570, 3.36, "Delta Gem"],
        [6.248, 22.507, 2.88, "Mu Gem"],
        [7.168, 16.540, 3.28, "Epsilon Gem"],
        [6.732, 25.131, 2.87, "Gamma Gem"],
        [9.525, 51.677, 3.17, "Psi UMa"],
        [12.257, 57.033, 3.31, "Megrez"],
        [8.225, 17.647, 3.53, "Epsilon CMi"],
        [6.350, -30.063, 3.02, "Omicron2 CMa"],
        [5.469, -20.759, 2.81, "Cursa"],
        [16.353, -25.593, 2.62, "Epsilon Sco"],
        [17.622, -42.998, 1.87, "Sargas2"],
        [16.005, -22.622, 2.32, "Delta Sco"],
        [15.985, -26.114, 2.89, "Pi Sco"],
        [8.159, -47.337, 1.93, "Alsephina"],
        [20.761, 33.970, 3.89, "Eta Cyg"],
        [19.512, 27.960, 2.87, "Albireo"],
        [20.370, 40.257, 2.23, "Sadr2"],
        [20.191, 38.047, 3.21, "Delta Cyg"],
        [19.938, 35.083, 2.46, "Gienah Cyg"],
        [19.749, 10.613, 3.36, "Delta Aql"],
        [19.770, 1.006, 3.77, "Theta Aql"],
        [19.104, 13.863, 2.72, "Tarazed"],
        [15.415, -41.166, 2.55, "Epsilon Lup"],
        [14.699, -47.388, 2.30, "Theta Cen"],
        [14.592, -42.158, 2.06, "Eta Cen"],
        [12.139, -24.729, 2.65, "Gamma Crv"],
        [12.497, -23.397, 2.95, "Eta Crv"],
        [14.177, -10.322, 3.38, "Mu Vir"],
        [13.578, -0.596, 3.38, "Zeta Vir"],
        [12.332, -0.667, 3.89, "Eta Vir"],
        [13.036, 10.959, 2.83, "Vindemiatrix"],
        [12.927, 3.397, 2.83, "Porrima"],
        [23.063, 28.083, 2.42, "Scheat2"],
    ];

    // === CONSTELLATION LINES ===
    // Each entry: [constellation name, [[star_a, star_b], ...]]
    var CONSTELLATIONS = {
        "Orion": [
            ["Betelgeuse", "Bellatrix"],
            ["Betelgeuse", "Alnilam"],
            ["Bellatrix", "Mintaka"],
            ["Mintaka", "Alnilam"],
            ["Alnilam", "Alnitak"],
            ["Alnitak", "Saiph"],
            ["Rigel", "Saiph"],
            ["Rigel", "Mintaka"]
        ],
        "Ursa Major": [
            ["Alkaid", "Mizar"],
            ["Mizar", "Alioth"],
            ["Alioth", "Megrez"],
            ["Megrez", "Phecda"],
            ["Megrez", "Dubhe"],
            ["Dubhe", "Merak"],
            ["Merak", "Phecda"]
        ],
        "Leo": [
            ["Regulus", "Denebola"],
            ["Regulus", "Algieba"],
            ["Denebola", "Zosma"],
            ["Zosma", "Theta Leo"],
            ["Algieba", "Zosma"]
        ],
        "Gemini": [
            ["Castor", "Pollux"],
            ["Castor", "Alhena"],
            ["Pollux", "Gamma Gem"]
        ],
        "Canis Major": [
            ["Sirius", "Mirzam"],
            ["Sirius", "Adhara"],
            ["Adhara", "Wezen"],
            ["Wezen", "Sirius"]
        ],
        "Scorpius": [
            ["Antares", "Acrab"],
            ["Acrab", "Dschubba"],
            ["Dschubba", "Antares"],
            ["Antares", "Shaula"]
        ],
        "Virgo": [
            ["Spica", "Vindemiatrix"],
            ["Vindemiatrix", "Porrima"],
            ["Porrima", "Spica"]
        ],
        "Corona Borealis": [
            ["Alphecca", "Unukalhai"]
        ],
        "Corvus": [
            ["Gienah", "Algorab"],
            ["Algorab", "Eta Crv"],
            ["Gienah", "Gamma Crv"],
            ["Gamma Crv", "Eta Crv"]
        ]
    };

    // === MATH ===
    function julianDate(y, m, d, h) {
        if (m <= 2) { y--; m += 12; }
        var A = Math.floor(y / 100);
        var B = 2 - A + Math.floor(A / 4);
        return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + h / 24.0 + B - 1524.5;
    }

    function greenwichMST(jd) {
        var T = (jd - 2451545.0) / 36525.0;
        var gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000.0;
        return ((gmst % 360) + 360) % 360; // degrees
    }

    function raDecToAltAz(raHours, decDeg, lstDeg, latDeg) {
        var ra = raHours * 15 * DEG;
        var dec = decDeg * DEG;
        var lst = lstDeg * DEG;
        var lat = latDeg * DEG;
        var ha = lst - ra;
        var sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
        var alt = Math.asin(sinAlt);
        var cosAz = (Math.sin(dec) - Math.sin(alt) * Math.sin(lat)) / (Math.cos(alt) * Math.cos(lat));
        cosAz = Math.max(-1, Math.min(1, cosAz));
        var az = Math.acos(cosAz);
        if (Math.sin(ha) > 0) az = 2 * Math.PI - az;
        return { alt: alt * RAD, az: az * RAD };
    }

    function project(altDeg, azDeg, cx, cy, radius) {
        var r = (90 - altDeg) / 90 * radius;
        var azRad = azDeg * DEG;
        return {
            x: cx + r * Math.sin(azRad),
            y: cy - r * Math.cos(azRad)
        };
    }

    // === COMPUTE BASE LST ===
    var utcHour = OBS_HOUR + OBS_MIN / 60.0 - UTC_OFFSET;
    var utcDay = OBS_DAY;
    if (utcHour < 0) { utcHour += 24; utcDay--; }
    var jd = julianDate(OBS_YEAR, OBS_MONTH, utcDay, utcHour);
    var gmstDeg = greenwichMST(jd);
    var baseLST = ((gmstDeg + LON) % 360 + 360) % 360;

    // Build name→index map
    var nameMap = {};
    for (var i = 0; i < CATALOG.length; i++) {
        if (CATALOG[i][3]) nameMap[CATALOG[i][3]] = i;
    }

    // === DOM ===
    var revealSection, revealBtn, overlay, canvas, ctx, caption, closeBtn, constellationToggle;
    var revealed = false;
    var showConstellations = true;
    var animId = null;
    var rotationOffset = 0;
    var ROTATION_SPEED = 0.0008; // degrees per frame
    var bgAudio = null;

    // === RANDOM BACKGROUND STARS ===
    var bgStars = [];
    function generateBGStars(count) {
        bgStars = [];
        for (var i = 0; i < count; i++) {
            bgStars.push({
                x: Math.random(),
                y: Math.random(),
                r: 0.3 + Math.random() * 1.2,
                a: 0.15 + Math.random() * 0.45,
                twinkleSpeed: 0.005 + Math.random() * 0.02,
                twinklePhase: Math.random() * Math.PI * 2
            });
        }
    }

    // === MAGNITUDE → SIZE & OPACITY ===
    function magToSize(mag) {
        var s = 4.5 - mag;
        if (s < 0.5) s = 0.5;
        if (s > 6) s = 6;
        return s;
    }

    function magToOpacity(mag) {
        var o = 1.0 - (mag + 1.5) / 6.0;
        return Math.max(0.25, Math.min(1.0, o));
    }

    // === STAR COLOR FROM MAGNITUDE (approximation) ===
    function starColor(mag) {
        if (mag < 0) return 'rgba(200,220,255,';    // bluish-white for brightest
        if (mag < 1) return 'rgba(240,240,255,';    // white
        if (mag < 2) return 'rgba(255,248,240,';    // warm white
        return 'rgba(255,244,230,';                  // slightly warm
    }

    // === DRAW STAR WITH GLOW ===
    function drawStar(x, y, size, opacity, color, isNamed) {
        // Outer glow
        if (size > 2) {
            var grad = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
            grad.addColorStop(0, color + (opacity * 0.3) + ')');
            grad.addColorStop(1, color + '0)');
            ctx.beginPath();
            ctx.arc(x, y, size * 4, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = color + opacity + ')';
        ctx.fill();

        // Bright center
        if (size > 1.5) {
            ctx.beginPath();
            ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, opacity * 1.3) + ')';
            ctx.fill();
        }
    }

    // === RENDER FRAME ===
    var frameCount = 0;
    function render() {
        if (!canvas) return;
        var w = canvas.width;
        var h = canvas.height;
        var cx = w / 2;
        var cy = h / 2;
        var radius = Math.min(cx, cy) * 0.92;

        frameCount++;

        // Background
        ctx.fillStyle = '#07070F';
        ctx.fillRect(0, 0, w, h);

        // Subtle radial gradient - dark sky
        var skyGrad = ctx.createRadialGradient(cx, cy * 0.6, 0, cx, cy, radius * 1.3);
        skyGrad.addColorStop(0, 'rgba(12, 14, 30, 0.6)');
        skyGrad.addColorStop(0.5, 'rgba(8, 8, 18, 0.3)');
        skyGrad.addColorStop(1, 'rgba(5, 5, 12, 0)');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, w, h);

        // Random background stars with twinkle
        for (var b = 0; b < bgStars.length; b++) {
            var bs = bgStars[b];
            var twinkle = 0.5 + 0.5 * Math.sin(frameCount * bs.twinkleSpeed + bs.twinklePhase);
            var alpha = bs.a * twinkle;
            ctx.beginPath();
            ctx.arc(bs.x * w, bs.y * h, bs.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255,252,245,' + alpha + ')';
            ctx.fill();
        }

        // Current LST with rotation
        var currentLST = baseLST + rotationOffset;

        // Compute projected positions for catalog stars
        var projected = [];
        for (var i = 0; i < CATALOG.length; i++) {
            var s = CATALOG[i];
            var pos = raDecToAltAz(s[0], s[1], currentLST, LAT);
            if (pos.alt > -2) { // include slightly below horizon for effect
                var p = project(Math.max(0, pos.alt), pos.az, cx, cy, radius);
                projected.push({
                    idx: i,
                    x: p.x,
                    y: p.y,
                    mag: s[2],
                    name: s[3],
                    alt: pos.alt
                });
            } else {
                projected.push(null);
            }
        }

        // Constellation lines
        if (showConstellations) {
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = 'rgba(100, 140, 200, 0.18)';
            for (var cName in CONSTELLATIONS) {
                var lines = CONSTELLATIONS[cName];
                for (var l = 0; l < lines.length; l++) {
                    var idxA = nameMap[lines[l][0]];
                    var idxB = nameMap[lines[l][1]];
                    if (idxA !== undefined && idxB !== undefined) {
                        var pA = projected[idxA];
                        var pB = projected[idxB];
                        if (pA && pB && pA.alt > 0 && pB.alt > 0) {
                            ctx.beginPath();
                            ctx.moveTo(pA.x, pA.y);
                            ctx.lineTo(pB.x, pB.y);
                            ctx.stroke();
                        }
                    }
                }
            }
        }

        // Draw catalog stars
        for (var j = 0; j < projected.length; j++) {
            var star = projected[j];
            if (!star || star.alt < 0) continue;
            // Fade near horizon
            var horizonFade = Math.min(1, star.alt / 10);
            var size = magToSize(star.mag);
            var opacity = magToOpacity(star.mag) * horizonFade;
            var col = starColor(star.mag);
            drawStar(star.x, star.y, size, opacity, col, !!star.name);
        }

        // Horizon fade
        var hGrad = ctx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius * 1.1);
        hGrad.addColorStop(0, 'rgba(7,7,15,0)');
        hGrad.addColorStop(1, 'rgba(7,7,15,1)');
        ctx.fillStyle = hGrad;
        ctx.fillRect(0, 0, w, h);

        // Rotation
        rotationOffset += ROTATION_SPEED;

        animId = requestAnimationFrame(render);
    }

    // === HOVER TOOLTIP ===
    var tooltip = null;
    var poeticNames = {
        "Sirius": "The brightest whisper in the dark",
        "Canopus": "An ancient guide for wanderers",
        "Arcturus": "The guardian of the spring sky",
        "Vega": "A diamond above the horizon",
        "Capella": "The little goat star, always faithful",
        "Rigel": "Orion's brilliant left foot",
        "Procyon": "The loyal companion before dawn",
        "Betelgeuse": "The red heart of the hunter",
        "Aldebaran": "The eye that follows the sisters",
        "Spica": "A sheaf of light in Virgo's hand",
        "Antares": "The rival of Mars, burning red",
        "Pollux": "The immortal twin",
        "Regulus": "The little king of Leo",
        "Deneb": "The tail of the celestial swan",
        "Polaris": "The one star that never moves",
        "Sirius": "The brightest star in your sky that night",
        "Castor": "The mortal twin beside his brother",
        "Alphard": "The solitary one in the sea serpent",
        "Denebola": "The lion's tail sweeping the sky",
        "Alphecca": "The jewel in the northern crown",
        "Arcturus": "Keeper of the bears above"
    };

    function onCanvasMove(e) {
        if (!revealed || !canvas) return;
        var rect = canvas.getBoundingClientRect();
        var mx = (e.clientX - rect.left) * (canvas.width / rect.width);
        var my = (e.clientY - rect.top) * (canvas.height / rect.height);

        var cx = canvas.width / 2;
        var cy = canvas.height / 2;
        var radius = Math.min(cx, cy) * 0.92;
        var currentLST = baseLST + rotationOffset;

        var closest = null;
        var closestDist = 30; // pixel threshold

        for (var i = 0; i < CATALOG.length; i++) {
            var s = CATALOG[i];
            if (!s[3]) continue;
            var pos = raDecToAltAz(s[0], s[1], currentLST, LAT);
            if (pos.alt < 2) continue;
            var p = project(pos.alt, pos.az, cx, cy, radius);
            var dx = mx - p.x;
            var dy = my - p.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < closestDist) {
                closestDist = dist;
                closest = { name: s[3], x: p.x, y: p.y };
            }
        }

        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'star-tooltip';
            document.body.appendChild(tooltip);
        }

        if (closest) {
            var text = poeticNames[closest.name] || closest.name;
            tooltip.textContent = text;
            tooltip.style.left = (e.clientX + 16) + 'px';
            tooltip.style.top = (e.clientY - 10) + 'px';
            tooltip.style.opacity = '1';
            canvas.style.cursor = 'crosshair';
        } else {
            tooltip.style.opacity = '0';
            canvas.style.cursor = 'default';
        }
    }

    // === RESIZE ===
    function resize() {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // === REVEAL & CLOSE ===
    function revealStarMap() {
        if (revealed) return;
        revealed = true;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Fade in
        canvas.style.opacity = '0';
        caption.style.opacity = '0';
        closeBtn.style.opacity = '0';
        if (constellationToggle) constellationToggle.style.opacity = '0';

        resize();
        generateBGStars(600);

        // Play Cornfield Chase
        if (bgAudio) {
            bgAudio.currentTime = 0;
            bgAudio.volume = 0;
            bgAudio.play().catch(function () { });
            // Fade in audio over 3 seconds
            var fadeIn = setInterval(function () {
                if (bgAudio.volume < 0.9) {
                    bgAudio.volume = Math.min(1, bgAudio.volume + 0.02);
                } else {
                    bgAudio.volume = 1;
                    clearInterval(fadeIn);
                }
            }, 60);
        }

        setTimeout(function () {
            canvas.style.opacity = '1';
            render();
        }, 200);

        setTimeout(function () {
            caption.style.opacity = '1';
        }, 1500);

        setTimeout(function () {
            closeBtn.style.opacity = '1';
            if (constellationToggle) constellationToggle.style.opacity = '1';
        }, 2500);
    }

    function closeStarMap() {
        revealed = false;
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (animId) cancelAnimationFrame(animId);
        animId = null;
        if (tooltip) tooltip.style.opacity = '0';

        // Fade out audio
        if (bgAudio && !bgAudio.paused) {
            var fadeOut = setInterval(function () {
                if (bgAudio.volume > 0.05) {
                    bgAudio.volume = Math.max(0, bgAudio.volume - 0.03);
                } else {
                    bgAudio.pause();
                    bgAudio.volume = 1;
                    clearInterval(fadeOut);
                }
            }, 50);
        }
    }

    // === INIT ===
    function init() {
        revealSection = document.getElementById('starmapSection');
        revealBtn = document.getElementById('starmapRevealBtn');
        overlay = document.getElementById('starmapOverlay');
        canvas = document.getElementById('starmapCanvas');
        caption = document.getElementById('starmapCaption');
        closeBtn = document.getElementById('starmapClose');
        constellationToggle = document.getElementById('starmapConstellations');

        if (!canvas || !overlay) return;
        ctx = canvas.getContext('2d');

        // Load audio
        bgAudio = new Audio('Cornfield Chase_spotdown.org.mp3');
        bgAudio.loop = true;
        bgAudio.preload = 'auto';

        revealBtn.addEventListener('click', revealStarMap);
        closeBtn.addEventListener('click', closeStarMap);

        if (constellationToggle) {
            constellationToggle.addEventListener('click', function () {
                showConstellations = !showConstellations;
                this.textContent = showConstellations ? '✦ hide constellations' : '✦ show constellations';
            });
        }

        canvas.addEventListener('mousemove', onCanvasMove);
        canvas.addEventListener('mouseleave', function () {
            if (tooltip) tooltip.style.opacity = '0';
        });

        window.addEventListener('resize', function () {
            if (revealed) resize();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && revealed) closeStarMap();
        });
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
