if 0 | endif
if has('vim_starting')
  if &compatible
    set nocomatible 
  endif
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif
call neobundle#begin(expand('~/.vim/bundle/'))
NeoBundleFetch 'Shougo/neobundle.vim'
NeoBundle 'Shougo/vimproc.vim', {
      \ 'build' : {
      \     'windows' : 'tools\\update-dll-mingw',
      \     'cygwin' : 'make -f make_cygwin.mak',
      \     'mac' : 'make',
      \     'linux' : 'make',
      \     'unix' : 'gmake',
      \    },
      \ }
NeoBundleLazy 'heavenshell/vim-jsdoc' , {'autoload': {'filetypes': ['javascript']}}
NeoBundle "cohama/vim-smartinput-endwise"
NeoBundleLazy 'Shougo/vimshell', {
      \ 'depends' : 'Shougo/vimproc',
      \ 'autoload' : {
      \   'commands' : [{ 'name' : 'VimShell', 'complete' : 'customlist,vimshell#complete'},
      \                 'VimShellExecute', 'VimShellInteractive',
      \                 'VimShellTerminal', 'VimShellPop'],
      \   'mappings' : ['<Plug>(vimshell_switch)']
      \ }}
NeoBundleLazy 'Shougo/vimfiler', {
      \ 'depends' : ["Shougo/unite.vim"],
      \ 'autoload' : {
      \   'commands' : [ "VimFilerTab", "VimFiler", "VimFilerExplorer", "VimFilerBufferDir" ],
      \   'mappings' : ['<Plug>(vimfiler_switch)'],
      \   'explorer' : 1,
      \ }}
NeoBundleLazy "majutsushi/tagbar", {
      \ "autoload": { "commands": ["TagbarToggle"] }}
NeoBundleLazy 'marcus/rsense', {
      \ 'autoload': {
      \   'filetypes': 'ruby',
      \ },
      \ }
NeoBundle 'Shougo/unite.vim'
NeoBundle "w0ng/vim-hybrid"
NeoBundle 'haya14busa/vim-easyoperator-phrase'
NeoBundle 'kmnk/vim-unite-giti.git'
NeoBundle 'Shougo/neomru.vim'
NeoBundle 'Shougo/neocomplete'
NeoBundle 'haya14busa/vim-easyoperator-line'
NeoBundle 'easymotion/vim-easymotion'
NeoBundle 'Shougo/neosnippet'
NeoBundle 'Shougo/neosnippet-snippets'
NeoBundle "osyo-manga/vim-reunions"
NeoBundle "tacroe/unite-mark"
NeoBundle "sgur/unite-qf"
NeoBundle 'Shougo/neoyank.vim'
NeoBundle 'myhere/vim-nodejs-complete'
NeoBundle 'szw/vim-tags'
NeoBundle 'mattn/emmet-vim'
NeoBundle "kana/vim-textobj-user"
NeoBundle "kana/vim-textobj-entire"
NeoBundle 'kana/vim-smartinput'
NeoBundle 'tpope/vim-surround'
NeoBundle 'othree/html5.vim'
NeoBundle 'pangloss/vim-javascript'
NeoBundle 'mxw/vim-jsx'
NeoBundle 'tpope/vim-commentary'
NeoBundle 'tyru/open-browser.vim'
NeoBundle 'thinca/vim-quickrun'
NeoBundle 'moll/vim-node'
NeoBundle 'scrooloose/syntastic'
NeoBundle 'tpope/vim-fugitive'
NeoBundle 'Yggdroot/indentLine'
NeoBundle 'elzr/vim-json'
NeoBundle 'itchyny/lightline.vim'
NeoBundle 'airblade/vim-gitgutter'
NeoBundle 'alpaca-tc/alpaca_powertabline'
NeoBundle 'Lokaltog/powerline', { 'rtp' : 'powerline/bindings/vim'}
NeoBundle 'Lokaltog/powerline-fontpatcher'
NeoBundle 'rizzatti/dash.vim'
NeoBundle 'tpope/vim-rails.git'
call neobundle#end()
NeoBundleCheck
""vim デフォルト設定
syntax on
filetype plugin indent  on
set wildmenu
set viminfo='50,\"1000,:0,n~/.vim/viminfo
" set list lcs=tab:\|\  
set nocompatible
set history=200
set modifiable
set write
set wrap
set confirm
set clipboard=unnamed
set modelines=0   
set tabstop=2
set shiftwidth=2
set expandtab
set number
set nobackup
set ruler
set laststatus=2
set showcmd
set hlsearch
set incsearch
set ignorecase
set title
set noshowmode
set runtimepath+=~/.vim/bundle
set backspace=indent,eol,start
set completeopt+=menuone
set suffixesadd+=.rb,js,.css,html
set autoindent
set smartindent
set conceallevel=0
"vim indentLine
let g:vim_json_syntax_conceal = 0
"fugitive　設定
" html5設定
let g:emmet_html5 = 1
"tagbar設定
nnoremap  <silent> <Leader>t :TagbarToggle<CR>
let g:tagbar_width = 40
"git status line 設定
" vim-gitgutter
let g:gitgutter_sign_added = '✚'
let g:gitgutter_sign_modified = '➜'
let g:gitgutter_sign_removed = '✘'
" Powerlineの設定
let g:Powerline_symbols = 'fancy'
" lightline.vim
let g:lightline = {
        \ 'colorscheme': 'landscape',
        \ 'mode_map': {'c': 'NORMAL'},
        \ 'active': {
        \   'left': [
        \     ['mode', 'paste'],
        \     ['fugitive', 'gitgutter', 'filename'],
        \   ],
        \   'right': [
        \     ['lineinfo', 'syntastic'],
        \     ['percent'],
        \     ['charcode', 'fileformat', 'fileencoding', 'filetype'],
        \   ]
        \ },
        \ 'component_function': {
        \   'modified': 'MyModified',
        \   'readonly': 'MyReadonly',
        \   'fugitive': 'MyFugitive',
        \   'filename': 'MyFilename',
        \   'fileformat': 'MyFileformat',
        \   'filetype': 'MyFiletype',
        \   'fileencoding': 'MyFileencoding',
        \   'mode': 'MyMode',
        \   'syntastic': 'SyntasticStatuslineFlag',
        \   'charcode': 'MyCharCode',
        \   'gitgutter': 'MyGitGutter',
        \ },
        \ 'separator': {'left': '', 'right': ''},
        \ 'subseparator': {'left': '', 'right': ''}
        \ }

function! MyModified()
  return &ft =~ 'help\|vimfiler\|gundo' ? '' : &modified ? '+' : &modifiable ? '' : '-'
endfunction

function! MyReadonly()
  return &ft !~? 'help\|vimfiler\|gundo' && &ro ? '⭤' : ''
endfunction

function! MyFilename()
  return ('' != MyReadonly() ? MyReadonly() . ' ' : '') .
        \ (&ft == 'vimfiler' ? vimfiler#get_status_string() :
        \  &ft == 'unite' ? unite#get_status_string() :
        \  &ft == 'vimshell' ? substitute(b:vimshell.current_dir,expand('~'),'~','') :
        \ '' != expand('%:t') ? expand('%:t') : '[No Name]') .
        \ ('' != MyModified() ? ' ' . MyModified() : '')
endfunction

function! MyFugitive()
  try
    if &ft !~? 'vimfiler\|gundo' && exists('*fugitive#head')
      let _ = fugitive#head()
      return strlen(_) ? ' '._ : ''
    endif
  catch
  endtry
  return ''
endfunction

function! MyFileformat()
  return winwidth('.') > 70 ? &fileformat : ''
endfunction

function! MyFiletype()
  return winwidth('.') > 70 ? (strlen(&filetype) ? &filetype : 'no ft') : ''
endfunction

function! MyFileencoding()
  return winwidth('.') > 70 ? (strlen(&fenc) ? &fenc : &enc) : ''
endfunction

function! MyMode()
  return winwidth('.') > 60 ? lightline#mode() : ''
endfunction

function! MyGitGutter()
  if ! exists('*GitGutterGetHunkSummary')
        \ || ! get(g:, 'gitgutter_enabled', 0)
        \ || winwidth('.') <= 90
    return ''
  endif
  let symbols = [
        \ g:gitgutter_sign_added . ' ',
        \ g:gitgutter_sign_modified . ' ',
        \ g:gitgutter_sign_removed . ' '
        \ ]
  let hunks = GitGutterGetHunkSummary()
  let ret = []
  for i in [0, 1, 2]
    if hunks[i] > 0
      call add(ret, symbols[i] . hunks[i])
    endif
  endfor
  return join(ret, ' ')
endfunction

" https://github.com/Lokaltog/vim-powerline/blob/develop/autoload/Powerline/Functions.vim
function! MyCharCode()
  if winwidth('.') <= 70
    return ''
  endif

  " Get the output of :ascii
  redir => ascii
  silent! ascii
  redir END

  if match(ascii, 'NUL') != -1
    return 'NUL'
  endif

  " Zero pad hex values
  let nrformat = '0x%02x'

  let encoding = (&fenc == '' ? &enc : &fenc)

  if encoding == 'utf-8'
    " Zero pad with 4 zeroes in unicode files
    let nrformat = '0x%04x'
  endif

  " Get the character and the numeric value from the return value of :ascii
  " This matches the two first pieces of the return value, e.g.
  " "<F>  70" => char: 'F', nr: '70'
  let [str, char, nr; rest] = matchlist(ascii, '\v\<(.{-1,})\>\s*([0-9]+)')

  " Format the numeric value
  let nr = printf(nrformat, nr)

  return "'". char ."' ". nr
endfunction
" easy motiong 設定
" map  f <Plug>(easymotion-bd-f)
nmap s <Plug>(easymotion-s2)
map  / <Plug>(easymotion-sn)
omap / <Plug>(easymotion-tn)
"neo complete 設定
imap <C-k> <Plug>(neosnippet_expand_or_jump)
smap <C-k> <Plug>(neosnippet_expand_or_jump)
xmap <C-l> <Plug>(neosnippet_expand_target)
imap <expr><TAB> neosnippet#expandable() ? "\<Plug>(neosnippet_expand_or_jump)" : pumvisible() ? "\<C-n>" : "\<TAB>"
smap <expr><TAB> neosnippet#expandable() ? "\<Plug>(neosnippet_expand_or_jump)" : "\<TAB>"
inoremap <silent> <CR> <C-r>=<SID>my_cr_function()<CR>
if !exists('g:neocomplete#sources#omni#input_patterns')
  let g:neocomplete#sources#omni#input_patterns = {}
endif
if !exists('g:neocomplete#keyword_patterns')
  let g:neocomplete#keyword_patterns = {}
endif
if !exists('g:neocomplete#force_omni_input_patterns')                                                                                                  
  let g:neocomplete#force_omni_input_patterns = {}                                                                                                   
endif                                                                                                                                                  
let g:neocomplete#force_omni_input_patterns.c =
      \ '[^.[:digit:] *\t]\%(\.\|->\)'
let g:neocomplete#force_omni_input_patterns.cpp =
      \ '[^.[:digit:] *\t]\%(\.\|->\)\|\h\w*::'
let g:neocomplete#force_omni_input_patterns.objc =
      \ '[^.[:digit:] *\t]\%(\.\|->\)'
let g:neocomplete#force_omni_input_patterns.objcpp =
      \ '[^.[:digit:] *\t]\%(\.\|->\)\|\h\w*::'
let g:neocomplete#force_omni_input_patterns.ruby = '[^. *\t]\.\w*\|\h\w*::'

" 環境変数RSENSE_HOMEに'/usr/local/bin/rsense'を指定しても動く
let g:neocomplete#sources#rsense#home_directory = '/usr/local/bin/rsense'
let g:rsenseUseOmniFunc = 1
let g:node_usejscomplete = 1
let g:neocomplete#enable_auto_select = 1
let g:neocomplete#enable_at_startup = 1
let g:neocomplete#enable_smart_case = 1
let g:neocomplete#sources#syntax#min_keyword_length = 3
let g:neocomplete#lock_buffer_name_pattern = '\*ku\*'
let $DOTVIM = $HOME . '/.vim'
" let g:neocomplete#sources#dictionary#dictionaries = {
"       \ 'default' : '',
"       \ 'vimshell' : $HOME.'/.vimshell_hist',
"       \ 'scheme' : $HOME.'/.gosh_completions',
"       \ 'ruby' : $DOTVIM.'/dict/ruby.dict',
"       \ 'php' : $DOTVIM.'/dict/php.dict',
"       \ 'java' : $DOTVIM.'/dict/java.dict'
"       \ }
let g:neocomplete#sources#dictionary#dictionaries = {
      \ 'default' : '',
      \ 'vimshell' : $HOME.'/.vimshell_hist',
      \ 'scheme' : $HOME.'/.gosh_completions',
      \ 'php' : $DOTVIM.'/dict/php.dict',
      \ 'java' : $DOTVIM.'/dict/java.dict'
      \ }
let g:neocomplete#keyword_patterns['default'] = '\h\w*'
let g:neocomplete#sources#omni#input_patterns.php = '[^. \t]->\h\w*\|\h\w*::'
let g:neocomplete#sources#omni#input_patterns.c = '[^.[:digit:] *\t]\%(\.\|->\)'
let g:neocomplete#sources#omni#input_patterns.cpp = '[^.[:digit:] *\t]\%(\.\|->\)\|\h\w*::'
autocmd FileType css setlocal omnifunc=csscomplete#completecss
autocmd FileType html setlocal omnifunc=htmlcomplete#completetags
autocmd FileType javascript setlocal omnifunc=nodejscomplete#completejs
autocmd FileType python setlocal omnifunc=pythoncomplete#Complete
autocmd FileType xml setlocal omnifunc=xmlcomplete#CompleteTags
function! s:my_cr_function()
  return pumvisible() ? "\<C-y>" : "\<CR>"
endfunction
" スニペットファイルの保存ディレクトリのパスを登録
let g:neosnippet#snippets_directory='~/.vim/bundle/snipmate-snippets/snippets'

"smart input 設定
if neobundle#tap('vim-smartinput')
  call neobundle#config({
        \   'autoload' : {
        \     'insert' : 1
        \   }
        \ })

  function! neobundle#tapped.hooks.on_post_source(bundle)
    call smartinput_endwise#define_default_rules()
  endfunction

  call neobundle#untap()
endif

if neobundle#tap('vim-smartinput-endwise')
  function! neobundle#tapped.hooks.on_post_source(bundle)
    " neosnippet and neocomplete compatible
    call smartinput#map_to_trigger('i', '<Plug>(vimrc_cr)', '<Enter>', '<Enter>')
    imap <expr><CR> !pumvisible() ? "\<Plug>(vimrc_cr)" :
          \ neosnippet#expandable() ? "\<Plug>(neosnippet_expand)" :
          \ neocomplete#close_popup()
  endfunction
  call neobundle#untap()
endif


"eclimdのomnifunc連携の設定
let g:EclimCompletionMethod ='omnifunc'
let g:neocomplete#force_omni_input_patterns.java =                                                                                                     
      \ '\%(\h\w*\|)\)\.\w*'
autocmd FileType java let g:EclimJavaSearchSingleResult = 'edit'
let g:EclimFileTypeValidate = 0
let g:EclimProjectTreeAutoOpen = 1


"easy motion 設定
nmap s <Plug>(easymotion-s2)


" vim-easy-align 設定
vmap <Enter> <Plug>(EasyAlign)



" vimshell 設定
let g:vimshell_user_prompt = 'fnamemodify(getcwd(), ":~")'
imap <silent> <C-q> <Plug>(vimshell_exit)
nnoremap <silent> vp :<C-u>VimShell<CR>
nmap <silent> vs :<C-u>VimShellPop<CR>

"JsDoc設定
nmap <silent> <C-l> ?function<cr>:noh<cr><Plug>(jsdoc)
"unite 設定
nnoremap [unite]    <Nop>
nmap     <C-u> [unite]
nmap <C-j><C-j> <Plug>(unite_exit)
let g:unite_enable_start_insert=1
let g:unite_source_history_yank_enable =1
let g:unite_source_file_mru_limit = 200
nnoremap <silent> [unite]<C-y> :<C-u>Unite bookmark history/yank<CR>
" nnoremap <silent> [unite]<C-b> :<C-u>Unite buffer bookmark file_mru<CR>
nnoremap <silent> [unite]<C-u> :<C-u>Unite buffer file file_mru<CR>
nnoremap <silent> [unite]gg :<C-u>Unite grep<CR>
nnoremap <silent> [unite]<C-g> :<C-u>Unite giti<cr>
nmap <silent> [unite]<C-r> :<C-u>Unite giti/status<CR>
nnoremap <silent> [unite]<C-b> :<C-u>Unite giti/branch<CR>
nnoremap <silent> [unite]l :<C-u>Unite giti/log<CR>
nnoremap <silent> [unite]<C-m> :<C-u>Unite mark<CR>
nnoremap <silent> [unite]<C-l> :<C-u>Unite line<CR>
nnoremap <silent> [unite]<C-q> :<C-u>Unite qf<CR>
nnoremap <silent> [unite]<C-a> :<C-u>UniteBookmarkAdd<CR>
call unite#custom#default_action('directory' , 'vimfiler')
" ファイルは tabdrop で開く
call unite#custom#default_action('file' , 'open')
" 次のように , で複数の kind に対して設定することもできる


"vim filer設定
let g:vimfiler_as_default_explorer  = 1
let g:vimfiler_safe_mode_by_default = 0
" let g:vimfiler_data_directory       = expand('~/.vim/etc/vimfiler')
" nnoremap <silent><C-u><C-j> :<C-u>VimFilerBufferDir -split -simple -winwidth=35 -no-quit -toggle<CR>
nnoremap <Leader>v :VimFilerExplorer<CR>
"neo yank設定


"クイックラン設定
let g:quickrun_config = {}
let g:quickrun_config['html'] = { 
      \'command' : 'open',
      \'exec' : '%c %s',
      \'outputter': 'browser'
      \}


"syntastic 設定
let g:syntastic_check_on_open=0 "ファイルを開いたときはチェックしない
let g:syntastic_check_on_save=1 "保存時にはチェック
let g:syntastic_check_on_wq = 0 " wqではチェックしない
let g:syntastic_auto_loc_list=1 "エラーがあったら自動でロケーションリストを開く
let g:syntastic_loc_list_height=6 "エラー表示ウィンドウの高さ
let g:loaded_syntastic_java_javac_checker = 1
let g:syntastic_javascript_checkers = ['eslint'] "ESLintを使う
let g:syntastic_mode_map = {
      \ 'mode': 'active',
      \ 'active_filetypes': ['javascript'],
      \ 'passive_filetypes': []
      \ }


"emmet 設定
let g:user_emmet_leader_key = '<C-e>'
let g:user_emmet_settings = {
      \    'variables' : {
      \        'lang' : 'ja',
      \    },
      \    'html' : {
      \        'filters' : 'html',
      \        'indentation' : '  ',
      \        'expandos' : {
      \            'ol': 'ol>li',
      \            'list': 'ul>li*3',
      \        },
      \        'default_attributes': {
      \            'a': {'href': ''},
      \            'link': [{'rel': 'stylesheet'}, {'href': ''}],
      \        },
      \        'aliases': {
      \            'bq': 'blockquote',
      \            'obj': 'object',
      \            'src': 'source',
      \        },
      \        'empty_elements': 'area,base,basefont,...,isindex,link,meta,...',
      \        'block_elements': 'address,applet,blockquote,...,li,link,map,...',
      \        'inline_elements': 'a,abbr,acronym,...',
      \        'empty_element_suffix': ' />',
      \    },
      \    'perl' : {
      \        'indentation' : '  ',
      \        'aliases' : {
      \            'req' : "require '|'"
      \        },
      \        'snippets' : {
      \            'use' : "use strict\nuse warnings\n\n",
      \            'w' : "warn \"${cursor}\";",
      \        },
      \    },
      \    'php' : {
      \        'extends' : 'html',
      \        'filters' : 'html,c',
      \    },
      \    'css' : {
      \        'filters' : 'fc',
      \    },
      \    'javascript' : {
      \        'snippets' : {
      \            'jq' : "\\$(function() {\n\t${cursor}${child}\n});",
      \            'jq:each' : "\\$.each(arr, function(index, item)\n\t${child}\n});",
      \            'fn' : "(function() {\n\t${cursor}\n})();",
      \            'tm' : "setTimeout(function() {\n\t${cursor}\n}, 100);",
      \        },
      \    },
      \    'java' : {
      \        'indentation' : '  ',
      \        'snippets' : {
      \            'main': "public static void main(String[] args) {\n\t|\n}",
      \            'println': "System.out.println(\"|\");",
      \            'class': "public class | {\n}\n",
      \        },
      \    },
      \}

" clang 設定
" let g:clang_c_options = '-std=c11'
" let g:clang_cpp_options = '-std=c++1z -stdlib=libc++ --pedantic-errors'
colorscheme hybrid

let g:neobundle#log_filename = $HOME . "/neobundle.log"
"カスタム設定
inoremap <Leader><Leader> :tabnew<CR>
inoremap <C-j> <Up>
inoremap <C-h> <Left>
inoremap <C-l> <Right>
nnoremap <C-]> g<C-]>
nmap con :Econtroller<CR>
nmap model :Emodel<CR>
nmap test :A<CR>
nmap <C-t> :tabNext<CR>
nmap <C-e> :tabnew<CR>
nmap gs :Gstatus<CR>
nmap ga :Gwrite<CR>
nmap gco :Gcommit<CR>
nmap gd :Gdiff<CR>
nmap gb :Gblame<CR>
" imap <C-j> <esc>
" vmap <C-j> <esc>
" function! ZenkakuSpace()
"   highlight ZenkakuSpace cterm=underline ctermfg=lightblue guibg=#fffff
" endfunction
highlight CursorLine term=reverse cterm=reverse
" autocmd BufNewFile,BufRead * match ZenkakuSpace /　/
autocmd InsertEnter * set cursorline
autocmd InsertLeave * set nocursorline
augroup source-vimrc
  autocmd!
  autocmd BufWritePost *vimrc source $MYVIMRC | set foldmethod=marker
  autocmd BufWritePost *gvimrc if has('gui_running') source $MYGVIMRC
augroup END
augroup grepopen
  autocmd!
  autocmd QuickfixCmdPost vimgrep cw
augroup END
au User Rails nnoremap <C-u>r :Dash rails:<C-R><C-W><CR>
