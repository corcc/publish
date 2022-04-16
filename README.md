# Templated from [actions/typescript-action](https://github.com/actions/typescript-action)
[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)
# Usage
```
    - uses: corcc/publish@node
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}  # GitHub Token (required)
        TASK_NAME: '🔧'  # Commit Comment (required)
        TZ: 'Asia/Tokyo' # Timezone (optional)
```
