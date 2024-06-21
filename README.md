[domain/default]
id_provider = ldap
cache_credentials = True
ldap_uri = ldaps://xxxx
ldap_search_base = DC=sdi,DC=xxxx,DC=org
ldap_schema = AD
ldap_default_bind_dn = CN=ReadOnlyUser,CN=Users,DC=sdi,DC=xxxx,DC=org
ldap_default_authtok_type = obfuscated_password
ldap_default_authtok = xxxxx
ldap_tls_cacert = /etc/pki/tls/cert.pem
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

[nss]
filter_users =nobody,root,mdaops,rabbitmq,postfix,apache,redis,nagios,tcpdump
filter_groups =nobody,root,mdaops,rabbitmq,postfix,apache,redis,nagios,tcpdump

[pam]
offline_credentials_expiration = 7
