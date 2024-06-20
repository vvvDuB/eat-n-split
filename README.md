[domain/default]
id_provider = ldap
cache_credentials = True
ldap_uri = ldaps://172.17.30.69
ldap_search_base = DC=ndk,DC=name
ldap_schema = AD
ldap_default_bind_dn = CN=ADReader,CN=Users,DC=ndk,DC=name
ldap_default_authtok_type = obfuscated_password
ldap_default_authtok = AAAQAFHxZmkH+pe7LsRM7627ECs8l0+70v5sFjaMJnEIb8iDcesy73s6+guDhsm433awOj8y0oanH8OkxRUv/pmQICkAAQID
ldap_tls_cacert = /etc/pki/tls/ad_cert.pem
ldap_tls_reqcert = allow
ldap_id_mapping = True
ldap_referrals = false
ldap_user_extra_attrs = altSecurityIdentities:altSecurityIdentities
ldap_user_ssh_public_key = altSecurityIdentities
ldap_use_tokengroups = True
enumerate = False
fallback_homedir = /home/%u
default_shell = /bin/bash

[sssd]
config_file_version = 2
services = nss, pam, ssh
domains = default
full_name_format = %1$s
debug_level = 3

[nss]
filter_users = nobody,root,postfix,apache,nginx
filter_groups = nobody,root,postfix,apache,nginx

[pam]
offline_credentials_expiration = 14
