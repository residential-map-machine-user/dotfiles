ECLIPSE_HOME=/Applications/Eclipse.app/Contents/Eclipse
export ECLIPSE_HOME
PATH=$HOME/android-ndk-r10e:$HOME/Library/Android/sdk/platform-tools:$HOME/Library/Android/sdk/tools:$GRADLE_HOME/bin:$HOME/.nodebrew/current/bin:/usr/local/bin:$PATH
export PATH
alias toms=$HOME/tomcat7/bin/startup.sh
alias tomf=$HOME/tomcat7/bin/shutdown.sh
alias report="open $HOME/apply_report_tmp"
alias ginga="open $HOME/intern_document"
alias re="source  $HOME/.bash_profile"
alias subs="open $HOME/Downloads/.@@@@@/*"
alias vi="vim"
alias lyr="cd ~/node_projects/learnyoureact && learnyoureact"
alias tob="cd ~/node_projects/tower-of-babel && tower-of-babel"
alias eclimd="$ECLIPSE_HOME/eclimd"

#THIS MUST BE AT THE END OF THE FILE FOR GVM TO WORK!!!
[[ -s "/Users/yukimatsuyama/.gvm/bin/gvm-init.sh" ]] && source "/Users/yukimatsuyama/.gvm/bin/gvm-init.sh"

# Add environment variable COCOS_CONSOLE_ROOT for cocos2d-x
export COCOS_CONSOLE_ROOT=/Users/yukimatsuyama/Downloads/cocos2d-x-3.8/tools/cocos2d-console/bin
export PATH=$COCOS_CONSOLE_ROOT:$PATH

# Add environment variable COCOS_TEMPLATES_ROOT for cocos2d-x
export COCOS_TEMPLATES_ROOT=/Users/yukimatsuyama/Downloads/cocos2d-x-3.8/templates
export PATH=$COCOS_TEMPLATES_ROOT:$PATH

# Add environment variable NDK_ROOT for cocos2d-x
export NDK_ROOT=/Users/yukimatsuyama/android-ndk-r10e
export PATH=$NDK_ROOT:$PATH

# Add environment variable ANDROID_SDK_ROOT for cocos2d-x
export ANDROID_SDK_ROOT=/Users/yukimatsuyama/Library/Android/sdk
export PATH=$ANDROID_SDK_ROOT:$PATH
export PATH=$ANDROID_SDK_ROOT/tools:$ANDROID_SDK_ROOT/platform-tools:$PATH

# Add environment variable ANT_ROOT for cocos2d-x
export ANT_ROOT=/Applications/Cocos/tools/ant/bin
export PATH=$ANT_ROOT:$PATH
export PATH="/usr/local/sbin:$PATH"

# Add environment variable COCOS_FRAMEWORKS for cocos2d-x
export COCOS_FRAMEWORKS=/Applications/Cocos/frameworks
export PATH=$COCOS_FRAMEWORKS:$PATH
