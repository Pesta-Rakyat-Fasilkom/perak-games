import subprocess
import os
from typing import Optional
import shutil
from pathlib import Path

from ghp_import import ghp_import

cwd = Path(".").absolute()
clumsy_dir = Path("clumsy-bird").absolute()
result_dir = Path("result").absolute()
flappy_dir = result_dir / "flappybird"

os.chdir(clumsy_dir)

res = subprocess.run("npx grunt-cli", shell=True)
res.check_returncode()

os.chdir(cwd)
result_dir.mkdir()
flappy_dir.mkdir()
(flappy_dir / "js").mkdir()

copy_dirs = ["bower_components", "build", "data"]
for dir in copy_dirs:
    shutil.copytree(clumsy_dir / dir, flappy_dir / dir)

copy_files = ["app.json", "humans.txt", "index.css", "index.html", "js/melonJS-min.js"]
for f in copy_files:
    shutil.copy(clumsy_dir / f, flappy_dir / f)

ghp_import(
    "result",
    mesg="Import from cmd",
    nojekyll=True,
    push=True,
    no_history=True,
)

shutil.rmtree(result_dir)
