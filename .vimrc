if 0 | endif
if has('vim_starting')
  if &compatible
    set nocomatible 
  endif
  set runtimepath+=~/.vim/bundle/neobundle.vim/
endif
call neobundle#begin(expand('~/.vim/bundle/'))
NeoBundleFetch 'Shougo/neobundle.vim'
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
" NeoBundleLazy 'junegunn/vim-easy-align', {
"    \ 'autoload': {
"    \   'commands' : ['EasyAlign'],
"    \   'mappings' : ['<Plug>(EasyAlign)'],
"    \ }}
NeoBundle 'Shougo/vimproc.vim', {
      \ 'build' : {
      \     'windows' : 'tools\\update-dll-mingw',
      \     'cygwin' : 'make -f make_cygwin.mak',
      \     'mac' : 'make',
      \     'linux' : 'make',
      \     'unix' : 'gmake',
      \    },
      \ }
NeoBundleLazy "majutsushi/tagbar", {
      \ "autoload": { "commands": ["TagbarToggle"] }}
NeoBundle 'Shougo/unite.vim'
NeoBundle 'Shougo/neomru.vim'
NeoBundle 'Shougo/neocomplete'
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
NeoBundle 'Lokaltog/vim-easymotion'
NeoBundle 'Yggdroot/indentLine'
NeoBundle 'moll/vim-node'
NeoBundle 'scrooloose/syntastic'
NeoBundle 'tpope/vim-fugitive'
call neobundle#end()
NeoBundleCheck
"vim デフォルト設定
set wildmenu
set viminfo='50,\"1000,:0,n~/.vim/viminfo
" set list lcs=tab:\|\  
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
set autoindent
set ruler
set laststatus=2
set showcmd
set hlsearch
set incsearch
set ignorecase
set title
set runtimepath+=~/.vim/bundle
set backspace=indent,eol,start
set completeopt+=menuone
set suffixesadd+=.rb,js,.css,html
set statusline=%{fugitive#statusline()}
set statusline+=%#warningmsg# "エラーメッセージの書式
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
set smartindent
syntax on
filetype plugin indent on

"tagbar設定
nnoremap  <silent> <leader>t :TagbarToggle<CR>
let g:tagbar_width = 40
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
let g:node_usejscomplete = 1
let g:neocomplete#enable_auto_select = 1
let g:neocomplete#enable_at_startup = 1
let g:neocomplete#enable_smart_case = 1
let g:neocomplete#sources#syntax#min_keyword_length = 3
let g:neocomplete#lock_buffer_name_pattern = '\*ku\*'
let $DOTVIM = $HOME . '/.vim'
let g:neocomplete#sources#dictionary#dictionaries = {
      \ 'default' : '',
      \ 'vimshell' : $HOME.'/.vimshell_hist',
      \ 'scheme' : $HOME.'/.gosh_completions',
      \ 'ruby' : $DOTVIM.'/dict/ruby.dict',
      \ 'php' : $DOTVIM.'/dict/php.dict',
      \ 'java' : $DOTVIM.'/dict/java.dict'
      \ }
let g:neocomplete#keyword_patterns['default'] = '\h\w*'
let g:neocomplete#sources#omni#input_patterns.php = '[^. \t]->\h\w*\|\h\w*::'
let g:neocomplete#sources#omni#input_patterns.c = '[^.[:digit:] *\t]\%(\.\|->\)'
let g:neocomplete#sources#omni#input_patterns.cpp = '[^.[:digit:] *\t]\%(\.\|->\)\|\h\w*::'
autocmd FileType css setlocal omnifunc=csscomplete#completecss
autocmd FileType html,markdown setlocal omnifunc=htmlcomplete#completetags
autocmd FileType javascript setlocal omnifunc=nodejscomplete#completejs
autocmd FileType python setlocal omnifunc=pythoncomplete#Complete
autocmd FileType xml setlocal omnifunc=xmlcomplete#CompleteTags
autocmd Filetype md set filetype=markdown
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
nnoremap <silent> [unite]<C-y> :<C-u>Unite history/yank<CR>
nnoremap <silent> [unite]<C-b> :<C-u>Unite buffer bookmark file_mru<CR>
nnoremap <silent> [unite]<C-u> :<C-u>Unite buffer file file_mru<CR>
nnoremap <silent> [unite]<C-g> :<C-u>Unite grep<CR>
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
let g:vimfiler_data_directory       = expand('~/.vim/etc/vimfiler')
nnoremap <silent><C-u><C-j> :<C-u>VimFilerBufferDir -split -simple -winwidth=35 -no-quit -toggle<CR>
nnoremap <Leader>v :VimFilerExplorer<CR>
"neo yank設定


"クイックラン設定
let g:quickrun_config = {}
let g:quickrun_config['markdown'] = {
      \   'outputter': 'browser'
      \}

let g:quickrun_config['md'] = {
      \   'outputter': 'browser'
      \}
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
let g:syntastic_javascript_checkers = ['eslint'] "ESLintを使う
let g:syntastic_mode_map = {
      \ 'mode': 'active',
      \ 'active_filetypes': ['javascript'],
      \ 'passive_filetypes': []
      \ }


"indent line 設定
let g:indentLine_enabled=1

"emmet 設定
let g:user_emmet_leader_key = '<c-e>'
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


"カスタム設定
inoremap <Leader><Leader> :tabnew<CR>
inoremap <C-j> <Up>
inoremap <C-h> <Left>
inoremap <C-l> <Right>
nnoremap <C-]> g<C-]>
nmap <C-t> :tabNext<CR>
nmap <C-e> :tabnew<CR>
" imap <C-j> <esc>
" vmap <C-j> <esc>
function! ZenkakuSpace()
  highlight ZenkakuSpace cterm=underline ctermfg=lightblue guibg=#fffff
endfunction
highlight CursorLine term=reverse cterm=reverse
autocmd BufNewFile,BufRead * match ZenkakuSpace /　/
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
if has('syntax')
  augroup ZenkakuSpace
    autocmd!
    autocmd ColorScheme * call ZenkakuSpace()
    autocmd VimEnter,WinEnter,BufRead * let w:m1=matchadd('ZenkakuSpace', '　')
  augroup END
  call ZenkakuSpace()
endif
