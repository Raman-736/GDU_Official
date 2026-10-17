"""Make a LÖVE game run on love.js (plain Lua 5.1 + WebGL) without touching the club's original source.

Each patch is applied to a fresh copy of the game's .love, so a patch never stacks on an old one.
Add an entry to PATCHES when a game fails in the browser with a Lua syntax error or a shader error:
  - LuaJIT-only syntax (`goto`) has to be rewritten with plain control flow
  - desktop GLSL features (initialised uniforms, array constructors) have to be rewritten for GLSL ES
"""
import re


def sub(text, old, new):
    assert text.count(old) == 1, f"expected exactly one match for: {old[:50]!r} (got {text.count(old)})"
    return text.replace(old, new)


def rewind_level_generator(t):
    t = sub(t, "      for j = 1, currentLevel:getHeight() do\n",
               "      for j = 1, currentLevel:getHeight() do\n      repeat\n")
    t = sub(t, "if a == 0 then goto continue end", "if a == 0 then break end")
    t = sub(t, "\n        ::continue::\n      end", "\n      until true\n      end")
    return t


def rewind_main(t):
    # The browser canvas is not the 1250x1000 window the game asks for, and love.js never sends a resize
    # event for it, so push keeps scaling for the wrong size and the level falls off-screen. Sync it.
    t = sub(t, '  love.window.setTitle("REWIND")\n',
               '  love.window.setTitle("REWIND")\n  push:resize(love.graphics.getWidth(), love.graphics.getHeight())\n')
    t = sub(t, "function love.update(dt)\n",
               "function love.update(dt)\n  local w, h = love.graphics.getDimensions()\n  if w ~= push._RWIDTH or h ~= push._RHEIGHT then push:resize(w, h) end\n")
    return t


def glsl_es(t):
    # GLSL ES has no initialised uniforms and no array constructors.
    t = re.sub(r'^uniform float (\w+) = ', r'const float \1 = ', t, flags=re.M)
    t = re.sub(r'const vec3 SEPIA\[2\] = vec3\[2\]\(\s*(vec3\([^)]*\)),[^;]*;', r'const vec3 SEPIA0 = \1;', t)
    return t.replace('SEPIA[0]', 'SEPIA0')


def rusty_room4(t):
    # the goto jumps out of the stack loop and over the popup loop to the code at ::continue::
    t = sub(t, "            for key, value in pairs(self.miniGame1Stack) do\n                assert(",
               "            local skipPopupLoop = false\n            for key, value in pairs(self.miniGame1Stack) do\n                assert(")
    t = sub(t, "                    goto continue\n", "                    skipPopupLoop = true\n                    break\n")
    t = sub(t, "            for key, value in pairs(self.miniGame1PopupStack) do\n                if checkAABBCollision(x, y, value) then\n                    table.insert(self.miniGame1Stack ,",
               "            if not skipPopupLoop then\n            for key, value in pairs(self.miniGame1PopupStack) do\n                if checkAABBCollision(x, y, value) then\n                    table.insert(self.miniGame1Stack ,")
    t = sub(t, "                end\n            end\n\n            ::continue::\n", "                end\n            end\n            end\n")
    return t


# slug -> { path inside the .love: function(text) -> text }
PATCHES = {
    'rewind': {
        'main.lua': rewind_main,
        'level_generator.lua': rewind_level_generator,
        'shaders/ghost_mode.glsl': glsl_es,
        'shaders/glitch.glsl': glsl_es,
    },
    'rusty-chamber': {'states/Room4.lua': rusty_room4},
}
